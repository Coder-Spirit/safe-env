import { SafeEnvError } from '../error'
import { getSafeEnv } from '../safe-env'

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

  describe('asInteger', () => {
    it('returns number when valid value is available', () => {
      const safeEnv = getSafeEnv({
        THEPOSITIVE: '42',
        THENEGATIVE: '-42',
      })

      expect(safeEnv.asInteger('THEPOSITIVE')).toBe(42)
      expect(safeEnv.asInteger('THENEGATIVE')).toBe(-42)

      // Checking that fallbacks are not used
      expect(safeEnv.asInteger('THEPOSITIVE', 30)).toBe(42)
      expect(safeEnv.asInteger('THENEGATIVE', -30)).toBe(-42)
    })

    it('returns default when not available', () => {
      const safeEnv = getSafeEnv({})
      expect(safeEnv.asInteger('MISSING', 33)).toBe(33)
    })

    it('errors when not available and no fallback is set', () => {
      const safeEnv = getSafeEnv({})
      expect(() => safeEnv.asInteger('MISSING')).toThrow(
        new SafeEnvError('MISSING is not defined, and no default was provided'),
      )
    })

    it('errors when non-numeric value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: 'hello' })

      // Without default
      expect(() => safeEnv.asInteger('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'integer'"),
      )

      // And with default
      expect(() => safeEnv.asInteger('WRONG', 42)).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'integer'"),
      )
    })

    it('errors when non-integer value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: '42.5' })

      // Without default
      expect(() => safeEnv.asInteger('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (42.5), expected 'integer'"),
      )

      // And with default
      expect(() => safeEnv.asInteger('WRONG', 42)).toThrow(
        new SafeEnvError("WRONG is not valid (42.5), expected 'integer'"),
      )
    })
  })

  describe('asPositiveInteger', () => {
    it('returns number when valid value is available', () => {
      const safeEnv = getSafeEnv({
        THEPOSITIVE: '42',
      })

      expect(safeEnv.asPositiveInteger('THEPOSITIVE')).toBe(42)

      // Checking that fallbacks are not used
      expect(safeEnv.asPositiveInteger('THEPOSITIVE', 30)).toBe(42)
    })

    it('returns default when not available', () => {
      const safeEnv = getSafeEnv({})
      expect(safeEnv.asPositiveInteger('MISSING', 33)).toBe(33)
    })

    it('errors when not available and no fallback is set', () => {
      const safeEnv = getSafeEnv({})
      expect(() => safeEnv.asPositiveInteger('MISSING')).toThrow(
        new SafeEnvError('MISSING is not defined, and no default was provided'),
      )
    })

    it('errors when non-numeric value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: 'hello' })

      // Without default
      expect(() => safeEnv.asPositiveInteger('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'integer'"),
      )

      // And with default
      expect(() => safeEnv.asPositiveInteger('WRONG', 42)).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'integer'"),
      )
    })

    it('errors when non-integer value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: '42.5' })

      // Without default
      expect(() => safeEnv.asPositiveInteger('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (42.5), expected 'integer'"),
      )

      // And with default
      expect(() => safeEnv.asPositiveInteger('WRONG', 42)).toThrow(
        new SafeEnvError("WRONG is not valid (42.5), expected 'integer'"),
      )
    })

    it('errors when non-positive value is set', () => {
      const safeEnv = getSafeEnv({ ZERO: '0', NEGATIVE: '-1' })

      // Without default
      expect(() => safeEnv.asPositiveInteger('ZERO')).toThrow(
        new SafeEnvError("ZERO is not valid (0), expected 'positive integer'"),
      )
      expect(() => safeEnv.asPositiveInteger('NEGATIVE')).toThrow(
        new SafeEnvError(
          "NEGATIVE is not valid (-1), expected 'positive integer'",
        ),
      )

      // And with default
      expect(() => safeEnv.asPositiveInteger('ZERO', 42)).toThrow(
        new SafeEnvError("ZERO is not valid (0), expected 'positive integer'"),
      )
      expect(() => safeEnv.asPositiveInteger('NEGATIVE', 42)).toThrow(
        new SafeEnvError(
          "NEGATIVE is not valid (-1), expected 'positive integer'",
        ),
      )
    })
  })

  describe('asBoolean', () => {
    it('returns boolean when valid value is available', () => {
      const safeEnv = getSafeEnv({
        // Truthy values
        TRUE_A: 'true',
        TRUE_B: 'True',
        TRUE_C: 'TRUE',
        TRUE_D: '1',
        TRUE_E: 'yes',
        TRUE_F: 'Yes',
        TRUE_G: 'YES',

        // Falsy values
        FALSE_A: 'false',
        FALSE_B: 'False',
        FALSE_C: 'FALSE',
        FALSE_D: '0',
        FALSE_E: 'no',
        FALSE_F: 'No',
        FALSE_G: 'NO',
      })

      expect(safeEnv.asBoolean('TRUE_A')).toBe(true)
      expect(safeEnv.asBoolean('TRUE_B')).toBe(true)
      expect(safeEnv.asBoolean('TRUE_C')).toBe(true)
      expect(safeEnv.asBoolean('TRUE_D')).toBe(true)
      expect(safeEnv.asBoolean('TRUE_E')).toBe(true)
      expect(safeEnv.asBoolean('TRUE_F')).toBe(true)
      expect(safeEnv.asBoolean('TRUE_G')).toBe(true)

      expect(safeEnv.asBoolean('FALSE_A')).toBe(false)
      expect(safeEnv.asBoolean('FALSE_B')).toBe(false)
      expect(safeEnv.asBoolean('FALSE_C')).toBe(false)
      expect(safeEnv.asBoolean('FALSE_D')).toBe(false)
      expect(safeEnv.asBoolean('FALSE_E')).toBe(false)
      expect(safeEnv.asBoolean('FALSE_F')).toBe(false)
      expect(safeEnv.asBoolean('FALSE_G')).toBe(false)

      // Checking that fallbacks are not used
      expect(safeEnv.asBoolean('TRUE_A', false)).toBe(true)
      expect(safeEnv.asBoolean('TRUE_B', false)).toBe(true)
      expect(safeEnv.asBoolean('TRUE_C', false)).toBe(true)
      expect(safeEnv.asBoolean('TRUE_D', false)).toBe(true)
      expect(safeEnv.asBoolean('TRUE_E', false)).toBe(true)
      expect(safeEnv.asBoolean('TRUE_F', false)).toBe(true)
      expect(safeEnv.asBoolean('TRUE_G', false)).toBe(true)

      expect(safeEnv.asBoolean('FALSE_A', true)).toBe(false)
      expect(safeEnv.asBoolean('FALSE_B', true)).toBe(false)
      expect(safeEnv.asBoolean('FALSE_C', true)).toBe(false)
      expect(safeEnv.asBoolean('FALSE_D', true)).toBe(false)
      expect(safeEnv.asBoolean('FALSE_E', true)).toBe(false)
      expect(safeEnv.asBoolean('FALSE_F', true)).toBe(false)
      expect(safeEnv.asBoolean('FALSE_G', true)).toBe(false)
    })

    it('returns default when not available', () => {
      const safeEnv = getSafeEnv({})
      expect(safeEnv.asBoolean('MISSING', true)).toBe(true)
      expect(safeEnv.asBoolean('MISSING', false)).toBe(false)
    })

    it('errors when not available and no fallback is set', () => {
      const safeEnv = getSafeEnv({})
      expect(() => safeEnv.asBoolean('MISSING')).toThrow(
        new SafeEnvError('MISSING is not defined, and no default was provided'),
      )
    })

    it('errors when non-boolean value is set', () => {
      const safeEnv = getSafeEnv({ WRONG: 'hello' })

      // Without default
      expect(() => safeEnv.asBoolean('WRONG')).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'boolean'"),
      )

      // And with default
      expect(() => safeEnv.asBoolean('WRONG', false)).toThrow(
        new SafeEnvError("WRONG is not valid (hello), expected 'boolean'"),
      )
    })
  })
})
