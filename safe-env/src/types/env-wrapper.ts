import {
  EnvVarName,
  IntegerInput,
  PositiveInput,
  PositiveIntegerInput,
  TaggedInteger,
  TaggedPositive,
} from './value-types'

export interface EnvWrapper {
  /**
   *
   */
  asString<S extends string>(varName: EnvVarName<S>, fallback?: string): string

  /**
   *
   */
  asNumber<S extends string>(varName: EnvVarName<S>, fallback?: number): number

  /**
   *
   */
  asPositiveNumber<S extends string, N extends number>(
    varName: EnvVarName<S>,
    fallback?: PositiveInput<N>,
  ): TaggedPositive<number>

  /**
   *
   */
  asInteger<S extends string, N extends number>(
    varName: EnvVarName<S>,
    fallback?: IntegerInput<N>,
  ): TaggedInteger<number>

  /**
   *
   */
  asPositiveInteger<S extends string, N extends number>(
    varName: EnvVarName<S>,
    fallback?: PositiveIntegerInput<N>,
  ): TaggedPositive<TaggedInteger<number>>

  /**
   *
   */
  asBoolean<S extends string>(
    varName: EnvVarName<S>,
    fallback?: boolean,
  ): boolean
}
