import { getSafeEnv } from '../safe-env'
import { SafeEnvError } from '../error'

describe('getSafeEnv', () => {
  describe('asString', () => {
    it('returns string when available', () => {
      const safeEnv = getSafeEnv({ THE_ANSWER_TO_EVERYTHING: 'forty-two' })

      expect(safeEnv.asString('THE_ANSWER_TO_EVERYTHING')).toBe('forty-two')
      expect(safeEnv.asString('THE_ANSWER_TO_EVERYTHING', 'I dunno')).toBe(
        'forty-two',
      )
    })

    it('returns default when not available', () => {
      const safeEnv = getSafeEnv({})
      expect(safeEnv.asString('MISSING', 'I dunno')).toBe('I dunno')
    })

    it('errors when not available and no fallback is set', () => {
      const safeEnv = getSafeEnv({})
      expect(() => safeEnv.asString('MISSING')).toThrow(
        new SafeEnvError('MISSING is not defined, and no default was provided'),
      )
    })
  })

  describe('asNumber', () => {
    it('returns number when valid value is available', () => {
      const safeEnv = getSafeEnv({
        THEFLOAT: '42.5',
        THEINT: '42',
        THENEGATIVE: '-42',
      })

      expect(safeEnv.asNumber('THEFLOAT')).toBe(42.5)
      expect(safeEnv.asNumber('THEINT')).toBe(42)
      expect(safeEnv.asNumber('THENEGATIVE')).toBe(-42)

      // Checking that fallbacks are not used
      expect(safeEnv.asNumber('THEFLOAT', 30.5)).toBe(42.5)
      expect(safeEnv.asNumber('THEINT', 30)).toBe(42)
      expect(safeEnv.asNumber('THENEGATIVE', -30)).toBe(-42)
    })

    it('returns default when not available', () => {
      const safeEnv = getSafeEnv({})
      expect(safeEnv.asNumber('MISSING', 33)).toBe(33)
    })

    it('errors when not available and no fallback is set', () => {
      const safeEnv = getSafeEnv({})
      expect(() => safeEnv.asNumber('MISSING')).toThrow(
        new SafeEnvError('MISSING is not defined, and no default was provided'),
      )
    })

    it('errors when non-numeric value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: 'hello' })

      // Without default
      expect(() => safeEnv.asNumber('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'number'"),
      )

      // And with default
      expect(() => safeEnv.asNumber('WRONG', 42)).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'number'"),
      )
    })
  })

  describe('asPositiveNumber', () => {
    it('returns number when valid value is available', () => {
      const safeEnv = getSafeEnv({
        THEFLOAT: '42.5',
        THEINT: '42',
      })

      expect(safeEnv.asPositiveNumber('THEFLOAT')).toBe(42.5)
      expect(safeEnv.asPositiveNumber('THEINT')).toBe(42)

      // Checking that fallbacks are not used
      expect(safeEnv.asPositiveNumber('THEFLOAT', 30.5)).toBe(42.5)
      expect(safeEnv.asPositiveNumber('THEINT', 30)).toBe(42)
    })

    it('returns default when not available', () => {
      const safeEnv = getSafeEnv({})
      expect(safeEnv.asPositiveNumber('MISSING', 33)).toBe(33)
    })

    it('errors when not available and no fallback is set', () => {
      const safeEnv = getSafeEnv({})
      expect(() => safeEnv.asPositiveNumber('MISSING')).toThrow(
        new SafeEnvError('MISSING is not defined, and no default was provided'),
      )
    })

    it('errors when non-numeric value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: 'hello' })

      // Without default
      expect(() => safeEnv.asPositiveNumber('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'number'"),
      )

      // And with default
      expect(() => safeEnv.asPositiveNumber('WRONG', 42)).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'number'"),
      )
    })

    it('errors when non-positive value is set', () => {
      const safeEnv = getSafeEnv({ ZERO: '0', NEGATIVE: '-1' })

      // Without default
      expect(() => safeEnv.asPositiveNumber('ZERO')).toThrow(
        new SafeEnvError("ZERO is not valid (0), expected 'positive number'"),
      )
      expect(() => safeEnv.asPositiveNumber('NEGATIVE')).toThrow(
        new SafeEnvError(
          "NEGATIVE is not valid (-1), expected 'positive number'",
        ),
      )

      // And with default
      expect(() => safeEnv.asPositiveNumber('ZERO', 42)).toThrow(
        new SafeEnvError("ZERO is not valid (0), expected 'positive number'"),
      )
      expect(() => safeEnv.asPositiveNumber('NEGATIVE', 42)).toThrow(
        new SafeEnvError(
          "NEGATIVE is not valid (-1), expected 'positive number'",
        ),
      )
    })
  })
})
