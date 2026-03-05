import { describe, it, expect } from 'vitest';
import Event from '../src/event.js';

describe('Event', () => {
  it('should have empty listeners initially', () => {
    expect(Event.listeners).toEqual({});
  });

  it('should register listener', () => {
    const listener = vi.fn(() => Promise.resolve());
    Event.on('test', listener);
    expect(Event.listeners['test']).toBeDefined();
    expect(Event.listeners['test']).toHaveLength(1);
    Event.remove_all('test');
  });

  it('should emit event to listeners', async () => {
    const listener = vi.fn((data) => Promise.resolve(data));
    Event.on('test', listener);
    await Event.emit('test', 'test-data');
    expect(listener).toHaveBeenCalledWith('test-data');
    Event.remove_all('test');
  });

  it('should handle multiple listeners', async () => {
    const listener1 = vi.fn(() => Promise.resolve(1));
    const listener2 = vi.fn(() => Promise.resolve(2));
    Event.on('test', listener1);
    Event.on('test', listener2);
    await Event.emit('test', null);
    expect(listener1).toHaveBeenCalled();
    expect(listener2).toHaveBeenCalled();
    Event.remove_all('test');
  });

  it('should return empty array when no listeners', async () => {
    const result = await Event.emit('nonexistent');
    expect(result).toEqual([]);
  });

  it('should remove specific listener', () => {
    const listener1 = vi.fn(() => Promise.resolve());
    const listener2 = vi.fn(() => Promise.resolve());
    Event.on('test', listener1);
    Event.on('test', listener2);
    Event.remove('test', listener1);
    expect(Event.listeners['test']).toHaveLength(1);
    expect(Event.listeners['test'][0]).toBe(listener2);
    Event.remove_all('test');
  });

  it('should remove all listeners', () => {
    const listener = vi.fn(() => Promise.resolve());
    Event.on('test', listener);
    Event.remove_all('test');
    expect(Event.listeners['test']).toBeUndefined();
  });

  it('should handle remove on non-existent event', () => {
    expect(() => Event.remove('nonexistent', vi.fn())).not.toThrow();
  });

  it('should handle remove_all on non-existent event', () => {
    expect(() => Event.remove_all('nonexistent')).not.toThrow();
  });
});
