import { describe, it, expect, beforeEach } from 'vitest';
import Modal from '../src/modal.js';
import Controller from '../src/controller.js';

describe('Modal', () => {
  let modal: Modal;
  let controller: Controller;

  beforeEach(() => {
    controller = new Controller();
    modal = new Modal(controller);
  });

  it('should create modal with null properties', () => {
    expect(modal.titleText).toBeNull();
    expect(modal.header).toBeNull();
    expect(modal.body).toBeNull();
    expect(modal.footer).toBeNull();
    expect(modal.backdropClose).toBe(false);
  });

  it('should set title', () => {
    modal.set_title('Test Title');
    expect(modal.titleText).toBe('Test Title');
  });

  it('should render modal structure', async () => {
    await modal.render();
    expect(modal.container).toBeDefined();
    expect(modal.header).toBeDefined();
    expect(modal.body).toBeDefined();
    expect(modal.footer).toBeDefined();
  });

  it('should render with title', async () => {
    modal.set_title('Test Title');
    await modal.render();
    // Title should be in the header
    const titleEl = modal.header?.querySelector('.modal-title');
    expect(titleEl).toBeDefined();
    expect(titleEl?.innerText).toBe('Test Title');
  });

  it('should show modal', async () => {
    await modal.render();
    modal.show();
    expect(modal.container.style.display).toBe('block');
    expect(modal.opacity).toBeDefined();
  });

  it('should hide modal', async () => {
    await modal.render();
    modal.show();
    const opacity = modal.opacity;
    modal.hide();
    expect(modal.container.style.display).toBe('none');
    if (opacity) {
      expect(document.body.contains(opacity)).toBe(false);
    }
  });

  it('should remove modal', async () => {
    await modal.render();
    modal.show();
    const container = modal.container;
    modal.remove();
    expect(document.body.contains(container)).toBe(false);
  });

  it('should close on backdrop click when backdropClose is true', async () => {
    modal.backdropClose = true;
    await modal.render();
    modal.show();
    // Simulate click on container (which acts as backdrop)
    modal.container.click();
    // Modal should be removed from DOM
    expect(document.body.contains(modal.container)).toBe(false);
  });

  it('should not close on backdrop click when backdropClose is false', async () => {
    modal.backdropClose = false;
    await modal.render();
    modal.show();
    modal.container.click();
    expect(modal.container.style.display).toBe('block');
  });

  it('should set and get document', () => {
    const mockDoc = { body: document.createElement('body') } as Document;
    Modal.set_document(mockDoc);
    expect(Modal.get_document()).toBe(mockDoc);
    Modal.set_document(window.document);
  });
});
