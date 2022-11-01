import type { Numeric, Zero } from './base.ts';
import type { TaggedInteger, TaggedNegative, TaggedPositive } from './output.ts';

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

export type NegativeInput<N extends Numeric> = N extends TaggedNegative<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  infer _NN
>
  ? N
  : N extends Zero
  ? never
  : `${N}` extends `-${string}`
  ? N
  : never

export type PositiveIntegerInput<N extends Numeric = number> =
  PositiveInput<N> & IntegerInput<N>

export type NegativeIntegerInput<N extends Numeric = number> =
  NegativeInput<N> & IntegerInput<N>
