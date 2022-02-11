# @coderspirit/lambda-ioc

[![NPM version](https://img.shields.io/npm/v/@coderspirit/safe-env.svg?style=flat)](https://www.npmjs.com/package/@coderspirit/safe-env)
[![TypeScript](https://badgen.net/npm/types/@coderspirit/safe-env)](http://www.typescriptlang.org/)
[![License](https://badgen.net/npm/license/@coderspirit/safe-env)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dm/@coderspirit/safe-env.svg?style=flat)](https://www.npmjs.com/package/@coderspirit/safe-env)
[![Known Vulnerabilities](https://snyk.io//test/github/Coder-Spirit/safe-env/badge.svg?targetFile=package.json)](https://snyk.io//test/github/Coder-Spirit/safe-env?targetFile=package.json)
[![Security Score](https://snyk-widget.herokuapp.com/badge/npm/@coderspirit%2Fsafe-env/badge.svg)](https://snyk.io/advisor/npm-package/@coderspirit/safe-env)

> Small library to load strongly typed values from environment variables

## Install instructions

### Node

```
# With NPM
npm install @coderspirit/safe-env

# Or with Yarn:
yarn add @coderspirit/safe-env
```

### [Deno](https://deno.land/)

`Safe-Env` is served through different CDNs
```typescript
import { ... } from 'https://denopkg.com/Coder-Spirit/safe-env@[VERSION]/safe-env/deno/index.ts'
import { ... } from 'https://deno.land/x/safe_env@[VERSION]/safe-env/deno/index.ts'
```



## Example

```ts
import { getSafeEnv } from '@coderspirit/safe-env'

const safeEnv = getSafeEnv(process.env) // For NodeJS
// const safeEnv = getSafeEnv(Deno.env.toObject()) // For Deno

// If there's no default, the value is considered as required, and it will throw
// an exception when it's missing.
const myVariable = safeEnv.asString('MY_VARIABLE')

// We can provide defaults, so no exception will be thrown when the environment
// variable is not set.
const myVariable = safeEnv.asString('MY_VARIABLE', 'hello world')

// We can parse numbers, with some constraints
const myNumber = safeEnv.asNumber('MY_NUMBER')
const myPositiveNumber = safeEnv.asPositiveNumber('MY_POSITIVE_NUMBER')
const myInteger = safeEnv.asInteger('MY_INTEGER')
const myPositiveInteger = safeEnv.asPositiveInteger('MY_POSITIVE_INTEGER')

// We can also parse "boolean" values, It will understand:
// true, yes, 1; false, no, 0; in a case-insensitive way.
const myBoolean = safeEnv.asBoolean('MY_BOOLEAN')
```
