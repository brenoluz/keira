import { describe, it, expect } from 'vitest';
import ValidatorBase from '../../src/validator/base.js';

describe('ValidatorBase', () => {
  it('should have error message', () => {
    const validator = new ValidatorBase('Error message');
    expect(validator.error_message).toBe('Error message');
  });

  it('should reject is_valid by default', async () => {
    const validator = new ValidatorBase('Error');
    await expect(validator.is_valid('value')).rejects.toBe('Method isValid not implemented!');
  });

  it('should get error message', async () => {
    const validator = new ValidatorBase('Custom error');
    const error = await validator.get_error();
    expect(error).toBe('Custom error');
  });
});
