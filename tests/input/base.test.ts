import { describe, it, expect, beforeEach } from 'vitest';
import InputText from '../../src/input/text.js';
import ValidatorNotNull from '../../src/validator/not_null.js';

describe('InputBase', () => {
  let input: InputText;

  beforeEach(() => {
    input = new InputText('test');
  });

  it('should have name property', () => {
    expect(input.get_name()).toBe('test');
  });

  it('should make input element', async () => {
    await input.make();
    expect(input.input).toBeDefined();
  });

  it('should set and get value', async () => {
    await input.set_value('test value');
    expect(input.get_value()).toBe('test value');
  });

  it('should set label', async () => {
    input.set_label('Test Label');
    await input.make();
    expect(input.get_label()).toBe('Test Label');
  });

  it('should add validators', () => {
    const validator = new ValidatorNotNull('Required');
    input.add_validator(validator);
    expect(input.validators).toContain(validator);
  });

  it('should validate with valid value', async () => {
    input.add_validator(new ValidatorNotNull('Required'));
    await input.set_value('valid');
    const isValid = await input.is_valid();
    expect(isValid).toBe(true);
  });

  it('should validate with invalid value', async () => {
    input.add_validator(new ValidatorNotNull('Required'));
    await input.set_value('');
    const isValid = await input.is_valid();
    expect(isValid).toBe(false);
  });

  it('should display errors when invalid', async () => {
    input.add_validator(new ValidatorNotNull('Required'));
    await input.set_value('');
    await input.make();
    await input.is_valid();
    expect(input.error.style.display).toBe('block');
  });

  it('should clear errors', async () => {
    await input.make();
    input.error.style.display = 'block';
    input.clear_errors();
    expect(input.error.style.display).toBe('none');
  });

  it('should set editable flag', () => {
    input.edit(false);
    expect(input.editable).toBe(false);
  });

  it('should focus input', async () => {
    await input.make();
    const focusSpy = vi.spyOn(input.input!, 'focus');
    input.focus();
    expect(focusSpy).toHaveBeenCalled();
    focusSpy.mockRestore();
  });

  it('should set help text', async () => {
    input.set_help('Help text');
    await input.make();
    expect(input.help).toBeDefined();
  });
});
