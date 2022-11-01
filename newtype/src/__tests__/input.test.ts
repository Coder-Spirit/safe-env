import type { IntegerInput, NegativeInput, PositiveInput } from '../types/input'

describe('Input Types', () => {
  describe('IntegerInput', () => {
    it('can be used to accept integer literals on function signatures', () => {
      // `number`
      const numberReceptor = <N extends number>(_v: IntegerInput<N>) => {
        // noop
      }

      numberReceptor(42) // No type errors
      numberReceptor(-42) // No type errors

      // `bigint`
      const bigintReceptor = <N extends bigint>(_v: IntegerInput<N>) => {
        // noop
      }

      bigintReceptor(42n) // No type errors
      bigintReceptor(-42n) // No type errors

      // Errors should be catched at the type level
      expect(true).toBe(true)
    })

    it('defines narrowed-down type extensions for IntegerInput', () => {
      type NumberType_extends_IntegerInput = 42 extends IntegerInput<42>
        ? true
        : false
      type BigintType_extends_IntegerInput = 42n extends IntegerInput<42n>
        ? true
        : false

      const does_42_extend_IntegerInput: NumberType_extends_IntegerInput = true
      const does_42n_extend_IntegerInput: BigintType_extends_IntegerInput = true

      expect(does_42_extend_IntegerInput).toBe(true)
      expect(does_42n_extend_IntegerInput).toBe(true)
    })

    it('does not accept floating point literals as IntegerInput', () => {
      type Float_extends_IntegerInput = 42.5 extends IntegerInput<42.5>
        ? true
        : false

      const does_float_extends_IntegerInput: Float_extends_IntegerInput = false
      expect(does_float_extends_IntegerInput).toBe(false)
    })
  })

  describe('PositiveInput', () => {
    it('can be used to accept positive literals on function signatures', () => {
      // `number`
      const receptor = <N extends number | bigint>(_v: PositiveInput<N>) => {
        // noop
      }

      receptor(42)
      receptor(42n)
      receptor(42.5)

      // Errors should be catched at the type level
      expect(true).toBe(true)
    })

    it('defines narrowed-down type extensions for PositiveInput', () => {
      type NumberType_extends_PositiveInput = 42 extends PositiveInput<42>
        ? true
        : false
      type Float_extends_PositiveInput = 42.5 extends PositiveInput<42.5>
        ? true
        : false
      type BigintType_extends_PositiveInput = 42n extends PositiveInput<42n>
        ? true
        : false

      const does_42_extend_PositiveInput: NumberType_extends_PositiveInput =
        true
      const does_float_extend_PositiveInput: Float_extends_PositiveInput = true
      const does_42n_extend_PositiveInput: BigintType_extends_PositiveInput =
        true

      expect(does_42_extend_PositiveInput).toBe(true)
      expect(does_float_extend_PositiveInput).toBe(true)
      expect(does_42n_extend_PositiveInput).toBe(true)
    })

    it('does not accept negative literals as PositiveInput', () => {
      type Number_extends_PositiveInput = -42 extends PositiveInput<-42>
        ? true
        : false
      type Float_extends_PositiveInput = -42.5 extends PositiveInput<-42.5>
        ? true
        : false
      type Bigint_extends_PositiveInput = -42n extends PositiveInput<-42n>
        ? true
        : false

      const does_number_extends_PositiveInput: Number_extends_PositiveInput =
        false
      const does_float_extends_PositiveInput: Float_extends_PositiveInput =
        false
      const does_bigint_extends_PositiveInput: Bigint_extends_PositiveInput =
        false

      expect(does_number_extends_PositiveInput).toBe(false)
      expect(does_float_extends_PositiveInput).toBe(false)
      expect(does_bigint_extends_PositiveInput).toBe(false)
    })
  })

  describe('NegativeInput', () => {
    it('can be used to accept negative literals on function signatures', () => {
      // `number`
      const receptor = <N extends number | bigint>(_v: NegativeInput<N>) => {
        // noop
      }

      receptor(-42)
      receptor(-42n)
      receptor(-42.5)

      // Errors should be catched at the type level
      expect(true).toBe(true)
    })

    it('defines narrowed-down type extensions for NegativeInput', () => {
      type NumberType_extends_NegativeInput = -42 extends NegativeInput<-42>
        ? true
        : false
      type Float_extends_NegativeInput = -42.5 extends NegativeInput<-42.5>
        ? true
        : false
      type BigintType_extends_NegativeInput = -42n extends NegativeInput<-42n>
        ? true
        : false

      const does_m42_extend_NegativeInput: NumberType_extends_NegativeInput =
        true
      const does_float_extend_NegativeInput: Float_extends_NegativeInput = true
      const does_m42n_extend_NegativeInput: BigintType_extends_NegativeInput =
        true

      expect(does_m42_extend_NegativeInput).toBe(true)
      expect(does_float_extend_NegativeInput).toBe(true)
      expect(does_m42n_extend_NegativeInput).toBe(true)
    })

    it('does not accept positive literals as NegativeInput', () => {
      type Number_extends_NegativeInput = 42 extends NegativeInput<42>
        ? true
        : false
      type Float_extends_NegativeInput = 42.5 extends NegativeInput<42.5>
        ? true
        : false
      type Bigint_extends_NegativeInput = 42n extends NegativeInput<42n>
        ? true
        : false

      const does_number_extends_NegativeInput: Number_extends_NegativeInput =
        false
      const does_float_extends_NegativeInput: Float_extends_NegativeInput =
        false
      const does_bigint_extends_NegativeInput: Bigint_extends_NegativeInput =
        false

      expect(does_number_extends_NegativeInput).toBe(false)
      expect(does_float_extends_NegativeInput).toBe(false)
      expect(does_bigint_extends_NegativeInput).toBe(false)
    })
  })
})
