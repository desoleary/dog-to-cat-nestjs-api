## Description

Dog to Cat API ~ Powered by [NestJS Framework](https://nestjs.com/)

## Installation

```bash
$ git clone git@github.com:desoleary/dog-to-cat-nestjs-api.git
$ cd dog-to-cat-nestjs-api
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start
# NOTE: Open a new console tab
$ open http://localhost:3000

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Technicals

- In order to cater for arbitrary JSON payloads I have gone with the following solution:
  - Flatten json payload in order to greatly reduce the complexity of traversing deeply nested paths
  - map use of a callback mechanism for each deep path and check if value is precisely `dog` then replace value with `cat`
  - preserve any other values

Example walkthrough:
```typescript
const originalPayload = {
  a: 1,
  b: 'dog',
  c: 'dog dog',
  d: 'cat',
  e: 'dog cat',
  f: { a: 'dog', list: [{ x1: 'dog', x2: 'cat', x3: 'doggdog' }] },
}

// flattened payload in order to simplify traversal of JSON payload
const flattenedPayload = {
  'a': 1,
  'b': 'dog',
  'c': 'dog dog',
  'd': 'cat',
  'e': 'dog cat',
  'f.a': 'dog',
  'f.list.0.x1': 'dog',
  'f.list.0.x2': 'cat',
  'f.list.0.x3': 'doggdog',
}

// we iterate through each flattened key value pairs and modify those that match our criteria e.g. /^dog$/
const flattenedPayloadWithModifications = {
  'a': 1,
  'b': 'cat',
  'c': 'dog dog',
  'd': 'cat',
  'e': 'dog cat',
  'f.a': 'cat',
  'f.list.0.x1': 'cat',
  'f.list.0.x2': 'cat',
  'f.list.0.x3': 'doggdog',
}

// undot/hydrate modified flattened payload
const finalizedPayload = {
  a: 1,
  b: 'cat',
  c: 'dog dog',
  d: 'cat',
  e: 'dog cat',
  f: { a: 'cat', list: [{ x1: 'cat', x2: 'cat', x3: 'doggdog' }] },
}
```

### Constraints / Future Development
> Project is mainly for demonstration purposes I am avoiding such optimisations/maintainability

- streaming payload in order to work on chunks of data
- Authentication
- timeouts
  - for very large payloads it might make sense to offload to the likes of a message queue
- Cypress E2E testing
