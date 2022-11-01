import type { FastProperty } from '@coderspirit/nominal'
import type { Numeric } from './base'

export type TaggedInteger<N extends Numeric = number> = FastProperty<
  N,
  { Fractional: false }
>

export type TaggedPositive<N extends Numeric = number> = FastProperty<
  N,
  { Sign: '+' }
>

export type TaggedNegative<N extends Numeric = number> = FastProperty<
  N,
  { Sign: '-' }
>
