import { describe, it, expect, beforeEach } from 'vitest';
import Alert from '../../src/modal/alert.js';

describe('Alert', () => {
  let alert: Alert;

  beforeEach(() => {
    alert = new Alert('Test message');
  });

  it('should create alert with message', () => {
    expect(alert.message).toBe('Test message');
  });

  it('should set message', () => {
    alert.set_message('New message');
    expect(alert.message).toBe('New message');
  });

  it('should render alert', async () => {
    await alert.render();
    expect(alert.body).toBeDefined();
    expect(alert.footer).toBeDefined();
  });

  it('should display message in body', async () => {
    await alert.render();
    const msgEl = alert.body?.querySelector('h5');
    expect(msgEl).toBeDefined();
    expect(msgEl?.innerText).toBe('Test message');
  });

  it('should have OK button', async () => {
    await alert.render();
    const okButton = alert.footer?.querySelector('button');
    expect(okButton).toBeDefined();
    expect(okButton?.innerText).toBe('OK');
  });

  it('should remove alert when OK clicked', async () => {
    await alert.render();
    const removeSpy = vi.spyOn(alert, 'remove');
    const okButton = alert.footer?.querySelector('button');
    okButton?.click();
    expect(removeSpy).toHaveBeenCalled();
    removeSpy.mockRestore();
  });
});
