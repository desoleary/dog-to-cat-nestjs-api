import isArray = require('lodash/isArray');
import get = require('lodash/get');
import flatten = require('lodash/flatten');
import isPlainObject = require('lodash/isPlainObject');
import last = require('lodash/last');
import set = require('lodash/set');

export const deepKeys = (obj) => {
  let first = true;
  let next = true;
  const _depth = [];

  while (next) {
    if (first) {
      _depth.push(Object.keys(obj));
      first = false;
    }

    const _keys = last(_depth);
    const _halfway = [];
    next = false;

    _keys.forEach((key) => {
      const _halfObj = get(obj, key);

      if (isPlainObject(_halfObj) || isArray(_halfObj)) {
        next = true;
        const _arr = Object.keys(_halfObj).map(
          (childKey) => `${key}.${childKey}`
        );
        _halfway.push(_arr);
      } else _halfway.push(key);
    });

    _depth.push(flatten(_halfway));
  }

  return last(_depth);
};

export const mapObject = (obj, fn) => {
  const _paths = deepKeys(obj);
  const newObj = {};

  _paths.forEach(function (p, i) {
    let key;
    let val = get(obj, p);
    const resArr = fn(val, p, i, obj);
    if (isArray(resArr)) {
      if (resArr.length > 1) {
        return set(newObj, resArr[0], resArr[1]);
      } else {
        return set(newObj, p, resArr);
      }
    } else if (isPlainObject(resArr)) {
      key = Object.keys(resArr)[0];
      val = resArr[key];
      return set(newObj, key, val);
    } else {
      return set(newObj, p, resArr);
    }
  });

  return newObj;
};
