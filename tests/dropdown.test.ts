import { describe, it, expect, beforeEach } from 'vitest';
import Dropdown from '../src/dropdown.js';

describe('Dropdown', () => {
  let dropdown: Dropdown;

  beforeEach(() => {
    dropdown = new Dropdown();
  });

  it('should create dropdown container', () => {
    expect(dropdown.container).toBeDefined();
    expect(dropdown.container.className).toBe('dropdown');
  });

  it('should initialize with null menu', () => {
    expect(dropdown.menu).toBeNull();
    expect(dropdown.menu_show).toBe(false);
  });

  it('should set button', () => {
    const button = document.createElement('button');
    dropdown.set_button(button);
    expect((dropdown as any)._button).toBe(button);
  });

  it('should make button', () => {
    const button = dropdown.make_button('Click me', 'btn-primary');
    expect(button.tagName).toBe('BUTTON');
    expect(button.innerText).toBe('Click me');
    expect(button.classList.contains('btn-primary')).toBe(true);
  });

  it('should make button with onclick toggle', async () => {
    await dropdown.make();
    dropdown.make_itens(); // Create the menu first
    const button = dropdown.make_button('Test');
    expect(dropdown.menu_show).toBe(false);
    button.click();
    expect(dropdown.menu_show).toBe(true);
  });

  it('should make and set button', () => {
    const button = dropdown.make_and_set_button('Test');
    expect((dropdown as any)._button).toBe(button);
  });

  it('should make item', () => {
    const item = dropdown.make_item('Item 1');
    expect(item.tagName).toBe('BUTTON');
    expect(item.classList.contains('dropdown-item')).toBe(true);
    expect(item.innerText).toBe('Item 1');
  });

  it('should add item', () => {
    const item = document.createElement('button');
    dropdown.add(item);
    expect((dropdown as any)._itens).toContain(item);
  });

  it('should make and add item', () => {
    const item = dropdown.make_and_add_item('Test Item');
    expect((dropdown as any)._itens).toContain(item);
  });

  it('should toggle menu', async () => {
    await dropdown.make();
    dropdown.toggle();
    expect(dropdown.menu_show).toBe(true);
    dropdown.toggle();
    expect(dropdown.menu_show).toBe(false);
  });

  it('should show menu', async () => {
    await dropdown.make();
    dropdown.show();
    expect(dropdown.menu_show).toBe(true);
    expect(dropdown.opacity).toBeDefined();
  });

  it('should hide menu', async () => {
    await dropdown.make();
    dropdown.show();
    dropdown.hide();
    expect(dropdown.menu_show).toBe(false);
  });

  it('should remove dropdown and opacity', async () => {
    await dropdown.make();
    dropdown.show();
    const opacity = dropdown.opacity;
    dropdown.remove();
    if (opacity) {
      expect(document.body.contains(opacity)).toBe(false);
    }
  });
});
