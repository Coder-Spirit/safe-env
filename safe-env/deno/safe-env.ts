import type { EnvVarName, EnvWrapper } from './types/env-wrapper.ts';
import type {
  IntegerInput,
  PositiveInput,
  PositiveIntegerInput,
  TaggedInteger,
  TaggedPositive,
} from '@coderspirit/newtype'
import { SafeEnvError } from './error.ts';

interface StringDict {
  [key: string]: string | undefined
}

export const getSafeEnv = (env: StringDict): EnvWrapper => {
  return {
    asString<S extends string>(
      varName: EnvVarName<S>,
      fallback?: string | undefined,
    ): string {
      const value = env[varName] ?? fallback
      if (value === undefined) {
        throw missingVarError(varName)
      }
      return value
    },

    asNumber<S extends string>(
      varName: EnvVarName<S>,
      fallback?: number | undefined,
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
      fallback?: PositiveInput<N> | undefined,
    ): TaggedPositive<number> {
      const value = this.asNumber(varName, fallback)
      if (value <= 0) {
        throw invalidVarError(varName, `${value}`, 'positive number')
      }

      return value as TaggedPositive<number>
    },

    asInteger<S extends string, N extends number>(
      varName: EnvVarName<S>,
      fallback?: IntegerInput<N> | undefined,
    ): TaggedInteger<number> {
      const strNum = env[varName]
      const value =
        (strNum
          ? Number.parseInt(strNum, 10) // TODO: use something stricter?
          : undefined) ?? fallback

      if (value === undefined) {
        throw missingVarError(varName)
      }
      if (
        Number.isNaN(value) ||
        (strNum && strNum.match(integerRegexp) === null)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        throw invalidVarError(varName, strNum!, 'integer')
      }

      return value as TaggedInteger<number>
    },

    asPositiveInteger<S extends string, N extends number>(
      varName: EnvVarName<S>,
      fallback?: PositiveIntegerInput<N> | undefined,
    ): TaggedPositive<TaggedInteger<number>> {
      const value = this.asInteger<S, N>(varName, fallback)
      if (value <= 0) {
        throw invalidVarError(varName, `${value}`, 'positive integer')
      }

      return value as TaggedPositive<TaggedInteger<number>>
    },

    asBoolean<S extends string>(
      varName: EnvVarName<S>,
      fallback?: boolean,
    ): boolean {
      const strBool =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        env[varName] !== undefined ? env[varName]!.toLowerCase() : undefined
      if (strBool && !(strBool in booleanTable)) {
        throw invalidVarError(varName, strBool, 'boolean')
      }
      const value = strBool
        ? booleanTable[strBool as keyof typeof booleanTable]
        : fallback
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
}
const integerRegexp = /^(0|-?[1-9][0-9]*)$/

const missingVarError = (varName: string) =>
  new SafeEnvError(`${varName} is not defined, and no default value was provided`)

const invalidVarError = (varName: string, value: string, expected: string) =>
  new SafeEnvError(`${varName} is not valid (${value}), expected '${expected}'`)
