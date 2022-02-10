import { FastProperty } from '@coderspirit/nominal'

// Basic Types (copied from Type-Fest)
// -----------------------------------------------------------------------------
type Numeric = number | bigint
type Zero = 0 | 0n


// "Input" Types
// -----------------------------------------------------------------------------
export type IntegerInput<N extends Numeric = number> = N extends TaggedInteger<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _NN
>
  ? N
  : `${N}` extends `${bigint}`
  ? N
  : never

export type PositiveInput<N extends Numeric> = N extends TaggedPositive<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _NN
>
  ? N
  : N extends Zero
  ? never
  : `${N}` extends `-${string}`
  ? never
  : N

export type PositiveIntegerInput<N extends Numeric = number> = PositiveInput<
  IntegerInput<N>
>


// "Output" Types
// -----------------------------------------------------------------------------
export type TaggedInteger<N extends Numeric = number> = FastProperty<
  N,
  { Fractional: false }
>
export type TaggedPositive<N extends Numeric = number> = FastProperty<
  N,
  { Sign: '+' }
>

export type EnvVarName<S extends string> = S extends
  | ''
  | ` ${string}`
  | `${string} `
  ? never
  : S
