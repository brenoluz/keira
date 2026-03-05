import { describe, it, expect, vi } from 'vitest';
import Controller from '../src/controller.js';

describe('Controller', () => {
  it('should have error method that logs to console', () => {
    const controller = new Controller();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const error = new Error('Test error');
    controller.error(error);

    expect(consoleSpy).toHaveBeenCalledWith(error);
    consoleSpy.mockRestore();
  });

  it('should handle unknown error types', () => {
    const controller = new Controller();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    controller.error('String error');

    expect(consoleSpy).toHaveBeenCalledWith('String error');
    consoleSpy.mockRestore();
  });

  it('should handle null/undefined errors', () => {
    const controller = new Controller();
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    controller.error(null);
    controller.error(undefined);

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    consoleSpy.mockRestore();
  });
});
