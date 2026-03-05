import { describe, it, expect, beforeEach } from 'vitest';
import View, { ce } from '../src/view.js';
import Controller from '../src/controller.js';

describe('ce function', () => {
  it('should create element with tag name', () => {
    const el = ce('div');
    expect(el.tagName).toBe('DIV');
  });

  it('should create element with className', () => {
    const el = ce('div', 'my-class');
    expect(el.className).toBe('my-class');
  });

  it('should create element with multiple classes', () => {
    const el = ce('div', 'class1 class2');
    expect(el.className).toBe('class1 class2');
  });

  it('should create element with attributes', () => {
    const el = ce('input', { id: 'test', placeholder: 'Enter text' });
    expect(el.getAttribute('id')).toBe('test');
    expect(el.getAttribute('placeholder')).toBe('Enter text');
  });

  it('should create element with className and attributes', () => {
    const el = ce('div', 'my-class', { id: 'test' });
    expect(el.className).toBe('my-class');
    expect(el.getAttribute('id')).toBe('test');
  });

  it('should have append method', () => {
    const parent = ce('div');
    const child = ce('span');
    const result = parent.append(child);
    expect(result).toBe(parent);
    expect(parent.contains(child)).toBe(true);
  });

  it('should have text method', () => {
    const el = ce('div');
    const result = el.text('Hello');
    expect(result).toBe(el);
    expect(el.innerText).toBe('Hello');
  });

  it('should have html method', () => {
    const el = ce('div');
    const result = el.html('<span>Test</span>');
    expect(result).toBe(el);
    expect(el.innerHTML).toBe('<span>Test</span>');
  });
});

describe('View', () => {
  let controller: Controller;

  beforeEach(() => {
    controller = new Controller();
  });

  it('should create container element', () => {
    const view = new View(controller);
    expect(view.container).toBeDefined();
    expect(view.container.tagName).toBe('DIV');
  });

  it('should have make method that returns Promise', async () => {
    const view = new View(controller);
    const result = view.make();
    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toBeUndefined();
  });

  it('should have toString method', () => {
    const view = new View(controller);
    view.container.innerHTML = '<p>Test</p>';
    expect(view.toString()).toBe('<p>Test</p>');
  });

  it('should have remove method', () => {
    const view = new View(controller);
    const container = document.body.appendChild(view.container);
    expect(document.body.contains(container)).toBe(true);
    view.remove();
    expect(document.body.contains(container)).toBe(false);
  });

  it('should have render method', async () => {
    const view = new View(controller);
    const result = await view.render();
    expect(result).toBe(view.container);
  });

  it('should call make during render', async () => {
    const view = new View(controller);
    const makeSpy = vi.spyOn(view, 'make');
    await view.render();
    expect(makeSpy).toHaveBeenCalled();
    makeSpy.mockRestore();
  });
});
