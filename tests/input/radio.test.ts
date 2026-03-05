import { describe, it, expect, beforeEach } from 'vitest';
import InputRadio from '../../src/input/radio.js';

describe('InputRadio', () => {
  let input: InputRadio;

  beforeEach(() => {
    input = new InputRadio('gender');
  });

  it('should create radio group', async () => {
    await input.make();
    expect(input.input).toBeDefined();
  });

  it('should add radio options', () => {
    input.add('m', 'Male');
    input.add('f', 'Female');
    expect(input.list).toHaveLength(2);
  });

  it('should add options with help text', () => {
    input.add('m', 'Male', 'Select male');
    expect(input.list[0][2]).toBe('Select male');
  });

  it('should set value', async () => {
    input.add('m', 'Male');
    await input.set_value('m');
    expect(input.get_value()).toBe('m');
  });

  it('should call onchange callback', async () => {
    let called = false;
    input.onchange = () => { called = true; };
    input.add('m', 'Male');
    await input.make();
    const radio = (input.input as HTMLDivElement).querySelector('input[type="radio"]');
    radio?.click();
    expect(called).toBe(true);
  });

  it('should display selected label', async () => {
    input.add('m', 'Male');
    await input.set_value('m');
    expect(input.display()).toBe('Male');
  });
});
