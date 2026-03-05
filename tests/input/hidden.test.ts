import { describe, it, expect, beforeEach } from 'vitest';
import InputHidden from '../../src/input/hidden.js';

describe('InputHidden', () => {
  let input: InputHidden;

  beforeEach(() => {
    input = new InputHidden('token');
  });

  it('should create hidden input', async () => {
    await input.make();
    expect(input.input).toBeDefined();
  });

  it('should have type hidden', async () => {
    await input.make();
    expect((input.input as HTMLInputElement).type).toBe('hidden');
  });

  it('should set value', async () => {
    await input.set_value('secret123');
    expect(input.get_value()).toBe('secret123');
  });

  it('should return empty string for display', () => {
    expect(input.display()).toBe('');
  });
});
