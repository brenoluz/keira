import { describe, it, expect, beforeEach } from 'vitest';
import back from '../src/back.js';

describe('Back', () => {
  beforeEach(() => {
    back.clear();
    back.set_default(() => 'default');
  });

  it('should have priority constants', () => {
    expect(back.MENU).toBe(8);
    expect(back.OVERRIDE).toBe(6);
    expect(back.MODAL).toBe(4);
    expect(back.DIALOG).toBe(3);
  });

  it('should add callback with priority', () => {
    const callback = vi.fn(() => 'test');
    back.add(5, callback);
    expect(back.list[5]).toBe(callback);
  });

  it('should remove callback by priority', () => {
    const callback = vi.fn(() => 'test');
    back.add(5, callback);
    back.remove(5);
    expect(back.list[5]).toBeUndefined();
  });

  it('should clear all callbacks', () => {
    back.add(5, vi.fn());
    back.add(6, vi.fn());
    back.clear();
    expect(back.list).toEqual({});
  });

  it('should set default callback', () => {
    const callback = vi.fn(() => 'default');
    back.set_default(callback);
    expect(back.default).toBe(callback);
  });

  it('should override with OVERRIDE priority', () => {
    const callback = vi.fn(() => 'override');
    back.override(callback);
    expect(back.list[back.OVERRIDE]).toBe(callback);
  });

  it('should call highest priority callback (lowest number)', () => {
    const lowPriorityCallback = vi.fn(() => 'low'); // priority 7
    const highPriorityCallback = vi.fn(() => 'high'); // priority 2 (higher)
    back.add(7, lowPriorityCallback);
    back.add(2, highPriorityCallback);
    back.back();
    expect(highPriorityCallback).toHaveBeenCalled();
    expect(lowPriorityCallback).not.toHaveBeenCalled();
  });

  it('should call default if no priority callbacks', () => {
    back.clear();
    const defaultCallback = vi.fn(() => 'default');
    back.set_default(defaultCallback);
    const result = back.back();
    expect(defaultCallback).toHaveBeenCalled();
    expect(result).toBe('default');
  });

  it('should return undefined if no callbacks', () => {
    back.clear();
    back.set_default(null as any);
    const result = back.back();
    expect(result).toBeUndefined();
  });
});
