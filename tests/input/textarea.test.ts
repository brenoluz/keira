import { describe, it, expect, beforeEach } from 'vitest';
import InputTextarea from '../../src/input/textarea.js';

describe('InputTextarea', () => {
  let input: InputTextarea;

  beforeEach(() => {
    input = new InputTextarea('description');
  });

  it('should create textarea', async () => {
    await input.make();
    expect(input.input).toBeDefined();
  });

  it('should have default rows of 2', async () => {
    await input.make();
    expect((input.input as HTMLTextAreaElement).rows).toBe(2);
  });

  it('should set custom rows', () => {
    input.rows(5);
    expect((input as any)._rows).toBe(5);
  });

  it('should have default maxlength of 100', () => {
    expect((input as any)._maxlength).toBe(100);
  });

  it('should set custom maxlength', () => {
    input.maxlength(500);
    expect((input as any)._maxlength).toBe(500);
  });

  it('should set value', async () => {
    await input.set_value('Long text here');
    await input.make();
    expect((input.input as HTMLTextAreaElement).innerText).toBe('Long text here');
  });
});
