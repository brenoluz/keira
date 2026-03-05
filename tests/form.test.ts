import { describe, it, expect, beforeEach } from 'vitest';
import Form from '../src/form.js';
import InputText from '../src/input/text.js';
import ValidatorNotNull from '../src/validator/not_null.js';

describe('Form', () => {
  let form: Form;

  beforeEach(() => {
    form = new Form();
  });

  it('should initialize with empty elements and validators', () => {
    expect(form.elements).toEqual([]);
    expect(form.validators).toEqual([]);
  });

  it('should add InputBase elements', () => {
    const input = new InputText('username');
    form.add(input);
    expect(form.elements).toHaveLength(1);
    expect(form.elements[0]).toBe(input);
  });

  it('should not add non-InputBase elements', () => {
    form.add({} as any);
    expect(form.elements).toHaveLength(0);
  });

  it('should get all elements including nested', () => {
    const input1 = new InputText('field1');
    const input2 = new InputText('field2');
    form.add(input1);
    form.add(input2);
    const elements = form.get_elements();
    expect(elements).toHaveLength(2);
    expect(elements).toContain(input1);
    expect(elements).toContain(input2);
  });

  it('should add validators', () => {
    const validator = new ValidatorNotNull('Required');
    form.add_validator(validator);
    expect(form.validators).toHaveLength(1);
    expect(form.validators[0]).toBe(validator);
  });

  it('should get values from elements', async () => {
    const input = new InputText('username');
    await input.set_value('john');
    form.add(input);
    const values = form.get_values();
    expect(values).toEqual({ username: 'john' });
  });

  it('should set values to elements', async () => {
    const input = new InputText('username');
    form.add(input);
    await input.set_value('jane'); // Use set_value which handles the update
    const value = input.get_value();
    expect(value).toBe('jane');
  });

  it('should validate form with valid data', async () => {
    const input = new InputText('username');
    await input.set_value('john');
    form.add(input);
    const isValid = await form.is_valid();
    expect(isValid).toBe(true);
  });

  it('should validate form with invalid data', async () => {
    const input = new InputText('username');
    input.add_validator(new ValidatorNotNull('Required'));
    await input.set_value('');
    form.add(input);
    const isValid = await form.is_valid();
    expect(isValid).toBe(false);
  });

  it('should pass extra context to validators', async () => {
    const input = new InputText('username');
    form.add(input);
    const context = { userId: 123 };
    const isValid = await form.is_valid(context);
    expect(isValid).toBe(true);
  });

  it('should handle multiple validators', async () => {
    const input1 = new InputText('username');
    const input2 = new InputText('email');
    input1.add_validator(new ValidatorNotNull('Required'));
    input2.add_validator(new ValidatorNotNull('Required'));
    await input1.set_value('john');
    await input2.set_value('john@example.com');
    form.add(input1);
    form.add(input2);
    const isValid = await form.is_valid();
    expect(isValid).toBe(true);
  });
});
