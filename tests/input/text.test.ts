import { describe, it, expect, beforeEach } from 'vitest';
import InputText from '../../src/input/text.js';

describe('InputText', () => {
  let input: InputText;

  beforeEach(() => {
    input = new InputText('username');
  });

  it('should create text input', async () => {
    await input.make();
    expect(input.input).toBeDefined();
    expect((input.input as HTMLInputElement).type).toBe('text');
  });

  it('should set value from constructor', async () => {
    await input.set_value('john');
    await input.make();
    // Value is stored internally, input element may not reflect it directly
    expect(input.get_value()).toBe('john');
  });

  it('should have correct name attribute', async () => {
    await input.make();
    expect((input.input as HTMLInputElement).name).toBe('username');
  });

  it('should be editable by default', async () => {
    await input.make();
    expect((input.input as HTMLInputElement).disabled).toBe(false);
  });

  it('should be disabled when not editable', async () => {
    input.edit(false);
    await input.make();
    expect((input.input as HTMLInputElement).disabled).toBe(true);
  });
});
