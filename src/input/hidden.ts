import InputBase from './base.js';

export default class InputHidden extends InputBase {
  override make_input(name: string): HTMLInputElement {
    const input = super.make_input(name) as HTMLInputElement;
    input.type = 'hidden';
    input.name = name;
    return input;
  }

  override display(): string {
    return '';
  }
}
