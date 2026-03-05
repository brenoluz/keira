import { describe, it, expect } from 'vitest';
import ValidatorNotNull from '../../src/validator/not_null.js';

describe('ValidatorNotNull', () => {
  it('should be invalid for null', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid(null);
    expect(result).toBe(false);
  });

  it('should be invalid for undefined', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid(undefined);
    expect(result).toBe(false);
  });

  it('should be invalid for empty string', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid('');
    expect(result).toBe(false);
  });

  it('should be valid for non-empty string', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid('valid');
    expect(result).toBe(true);
  });

  it('should be valid for number', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid(123);
    expect(result).toBe(true);
  });

  it('should be valid for object', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid({ key: 'value' });
    expect(result).toBe(true);
  });

  it('should be valid for array', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid([1, 2, 3]);
    expect(result).toBe(true);
  });

  it('should be valid for boolean false', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid(false);
    expect(result).toBe(true);
  });

  it('should be valid for boolean true', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid(true);
    expect(result).toBe(true);
  });

  it('should be valid for zero', async () => {
    const validator = new ValidatorNotNull('Required');
    const result = await validator.is_valid(0);
    expect(result).toBe(true);
  });

  it('should get error message', async () => {
    const validator = new ValidatorNotNull('Field is required');
    const error = await validator.get_error();
    expect(error).toBe('Field is required');
  });
});
