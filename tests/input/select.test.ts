import { describe, it, expect, beforeEach } from 'vitest';
import InputSelect from '../../src/input/select.js';

describe('InputSelect', () => {
  let input: InputSelect;

  beforeEach(() => {
    input = new InputSelect('country');
  });

  it('should create select input', async () => {
    await input.make();
    expect(input.input).toBeDefined();
  });

  it('should add options', () => {
    input.add('us', 'United States');
    input.add('uk', 'United Kingdom');
    expect(input.list).toHaveLength(2);
  });

  it('should set value', async () => {
    input.add('us', 'United States');
    await input.set_value('us');
    expect(input.get_value()).toBe('us');
  });

  it('should call onchange callback', async () => {
    let called = false;
    let callbackValue: unknown;
    input.onchange = (obj, value) => {
      called = true;
      callbackValue = value;
    };
    input.add('us', 'United States');
    await input.make();
    const select = input.input as HTMLSelectElement;
    select.value = 'us';
    select.dispatchEvent(new Event('change'));
    expect(called).toBe(true);
    expect(callbackValue).toBe('us');
  });

  it('should display selected label', async () => {
    input.add('us', 'United States');
    await input.set_value('us');
    expect(input.display()).toBe('United States');
  });

  it('should display --- for empty value', async () => {
    expect(input.display()).toBe('---');
  });

  it('should be disabled when not editable', async () => {
    input.edit(false);
    input.add('us', 'United States');
    await input.make();
    expect((input.input as HTMLSelectElement).disabled).toBe(true);
  });
});
