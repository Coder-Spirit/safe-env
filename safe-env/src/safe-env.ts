import {
  EnvVarName,
  IntegerInput,
  PositiveInput,
  PositiveIntegerInput,
  TaggedInteger,
  TaggedPositive,
} from 'types/value-types'
import { EnvWrapper } from './types/env-wrapper'
import { SafeEnvError } from './error'

interface StringDict {
  [key: string]: string | undefined
}

export const getSafeEnv = (env: StringDict): EnvWrapper => {
  return {
    asString<S extends string>(
      varName: EnvVarName<S>,
      fallback?: string,
    ): string {
      const value = env[varName] ?? fallback
      if (value === undefined) {
        throw missingVarError(varName)
      }
      return value
    },

    asNumber<S extends string>(
      varName: EnvVarName<S>,
      fallback?: number,
    ): number {
      const strNum = env[varName]
      const value =
        (!!strNum && !Number.isNaN(strNum)
          ? Number.parseFloat(strNum) // TODO: use something stricter?
          : undefined) ?? fallback

      if (value === undefined) {
        throw missingVarError(varName)
      }
      if (Number.isNaN(value)) {
        // We know strNum is not undefined because value is not undefined.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        throw invalidVarError(varName, strNum!, 'number')
      }

      return value
    },

    asPositiveNumber<S extends string, N extends number>(
      varName: EnvVarName<S>,
      fallback?: PositiveInput<N>,
    ): TaggedPositive<number> {
      const strNum = env[varName]
      const value =
        (strNum
          ? Number.parseFloat(strNum) // TODO: use something stricter?
          : undefined) ?? fallback

      if (value === undefined) {
        throw missingVarError(varName)
      }
      if (Number.isNaN(value)) {
        // We know strNum is not undefined because value is not undefined.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        throw invalidVarError(varName, strNum!, 'number')
      }
      if (value <= 0) {
        throw invalidVarError(varName, `${value}`, 'positive number')
      }

      return value as TaggedPositive<number>
    },

    asInteger<S extends string, N extends number>(
      varName: EnvVarName<S>,
      fallback?: IntegerInput<N>,
    ): TaggedInteger<number> {
      const strNum = env[varName]
      const value =
        (strNum
          ? Number.parseInt(strNum, 10) // TODO: use something stricter?
          : undefined) ?? fallback

      if (value === undefined) {
        throw missingVarError(varName)
      }
      // We know strNum is not undefined because value is not undefined.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (Number.isNaN(value) || strNum!.match(integerRegexp) === null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        throw invalidVarError(varName, strNum!, 'integer')
      }

      return value as TaggedInteger<number>
    },

    asPositiveInteger<S extends string, N extends number>(
      varName: EnvVarName<S>,
      fallback?: PositiveIntegerInput<N>,
    ): TaggedPositive<TaggedInteger<number>> {
      const strNum = env[varName]
      const value =
        (strNum
          ? Number.parseInt(strNum, 10) // TODO: use something stricter?
          : undefined) ?? fallback

      if (value === undefined) {
        throw missingVarError(varName)
      }
      // We know strNum is not undefined because value is not undefined.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      if (Number.isNaN(value) || strNum!.match(integerRegexp) === null) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        throw invalidVarError(varName, strNum!, 'integer')
      }
      if (value <= 0) {
        throw invalidVarError(varName, `${value}`, 'positive number')
      }

      return value as TaggedPositive<TaggedInteger<number>>
    },

    asBoolean<S extends string>(
      varName: EnvVarName<S>,
      fallback?: boolean,
    ): boolean {
      const value =
        booleanTable[
          (env[varName]?.toLocaleLowerCase() as keyof typeof booleanTable) ??
            'f'
        ] ?? fallback
      if (value === undefined) {
        throw missingVarError(varName)
      }
      return value
    },
  }
}

const booleanTable = {
  true: true,
  false: false,
  yes: true,
  no: false,
  '1': true,
  '0': false,
  f: undefined,
}
const integerRegexp = /^[1-9][0-9]*$/

const missingVarError = (varName: string) =>
  new SafeEnvError(`${varName} is not defined, and no default was provided`)

const invalidVarError = (varName: string, value: string, expected: string) =>
  new SafeEnvError(`${varName} is not valid (${value}), expected '${expected}'`)
