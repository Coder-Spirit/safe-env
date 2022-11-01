import type { FastProperty } from 'https://deno.land/x/nominal@3.2.1/nominal/deno/index.ts'
import type { Numeric } from './base.ts';

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
