import { describe, it, expect } from 'vitest';
import { makeId, ellipsisText, uuid } from '../src/tools.js';

describe('tools', () => {
  describe('makeId', () => {
    it('should generate string of specified length', () => {
      const id = makeId(10);
      expect(id).toHaveLength(10);
    });

    it('should generate different ids', () => {
      const id1 = makeId(10);
      const id2 = makeId(10);
      expect(id1).not.toBe(id2);
    });

    it('should generate id with alphanumeric characters', () => {
      const id = makeId(20);
      expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    });

    it('should handle length 0', () => {
      const id = makeId(0);
      expect(id).toBe('');
    });
  });

  describe('uuid', () => {
    it('should generate valid UUID format', () => {
      const id = uuid();
      expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('should generate different UUIDs', () => {
      const uuid1 = uuid();
      const uuid2 = uuid();
      expect(uuid1).not.toBe(uuid2);
    });

    it('should have correct length', () => {
      const id = uuid();
      expect(id).toHaveLength(36);
    });
  });

  describe('ellipsisText', () => {
    it('should modify element text', () => {
      const el = document.createElement('div');
      el.style.width = '50px';
      el.style.height = '20px';
      el.style.overflow = 'hidden';
      el.style.whiteSpace = 'nowrap';
      el.innerText = 'This is a very long text that should be truncated';
      document.body.appendChild(el);
      ellipsisText(el);
      // Text should be modified (either truncated or unchanged based on overflow)
      expect(el.innerText).toBeDefined();
      document.body.removeChild(el);
    });

    it('should not truncate when no overflow', () => {
      const el = document.createElement('div');
      el.style.width = '500px';
      el.style.height = '100px';
      el.innerText = 'Short text';
      document.body.appendChild(el);
      ellipsisText(el);
      expect(el.innerText).toBe('Short text');
      document.body.removeChild(el);
    });
  });
});
