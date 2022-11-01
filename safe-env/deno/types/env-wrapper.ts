import type {
  IntegerInput,
  PositiveInput,
  PositiveIntegerInput,
  TaggedInteger,
  TaggedPositive,
} from '@coderspirit/newtype'

export type EnvVarName<S extends string> = S extends
  | ''
  | ` ${string}`
  | `${string} `
  ? never
  : S

export interface EnvWrapper {
  /**
   * Returns the value of the environment variable as a string.
   */
  asString<S extends string>(
    varName: EnvVarName<S>,
    fallback?: string | undefined,
  ): string

  /**
   * Returns the value of the environment variable as a number.
   */
  asNumber<S extends string>(
    varName: EnvVarName<S>,
    fallback?: number | undefined,
  ): number

  /**
   * Returns the value of the environment variable as a positive number.
   */
  asPositiveNumber<S extends string, N extends number>(
    varName: EnvVarName<S>,
    fallback?: PositiveInput<N> | undefined,
  ): TaggedPositive<number>

  /**
   * Returns the value of the environment variable as an integer.
   */
  asInteger<S extends string, N extends number>(
    varName: EnvVarName<S>,
    fallback?: IntegerInput<N> | undefined,
  ): TaggedInteger<number>

  /**
   * Returns the value of the environment variable as a positive integer.
   */
  asPositiveInteger<S extends string, N extends number>(
    varName: EnvVarName<S>,
    fallback?: PositiveIntegerInput<N> | undefined,
  ): TaggedPositive<TaggedInteger<number>>

  /**
   * Returns the value of the environment variable as a boolean.
   */
  asBoolean<S extends string>(
    varName: EnvVarName<S>,
    fallback?: boolean | undefined,
  ): boolean
}
