import { describe, it, expect } from 'vitest';
import code from '../src/code.js';

describe('code', () => {
  it('should have TIMEOUT constant', () => {
    expect(code.TIMEOUT).toBe('@keira/timeout');
  });

  it('should have INVALID_FORM constant', () => {
    expect(code.INVALID_FORM).toBe('@keira/form/invalid_form');
  });

  it('should have DISCONNECTED constant', () => {
    expect(code.DISCONNECTED).toBe('disconnected');
  });

  it('should have all expected keys', () => {
    expect(Object.keys(code)).toEqual(['TIMEOUT', 'INVALID_FORM', 'DISCONNECTED']);
  });
});
