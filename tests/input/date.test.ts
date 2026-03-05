import { describe, it, expect, beforeEach } from 'vitest';
import InputDate from '../../src/input/date.js';

describe('InputDate', () => {
  let input: InputDate;

  beforeEach(() => {
    input = new InputDate('birthdate');
  });

  it('should create date input', async () => {
    await input.make();
    expect(input.input).toBeDefined();
  });

  it('should have format as null initially', () => {
    expect(input.format).toBeNull();
  });

  it('should get format', () => {
    const format = input.get_format();
    expect(format).toBeDefined();
    expect(format).toMatch(/dd.*MM.*aaaa|MM.*dd.*aaaa|aaaa.*MM.*dd/);
  });

  it('should cache format', () => {
    const format1 = input.get_format();
    const format2 = input.get_format();
    expect(format1).toBe(format2);
  });

  it('should set value', async () => {
    await input.set_value('2000-01-01');
    expect(input.get_value()).toBe('2000-01-01');
  });
});
