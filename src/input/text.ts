import InputBase from './base.js';

export default class InputText extends InputBase {
  override make_input(name: string): HTMLInputElement {
    const input = super.make_input(name) as HTMLInputElement;
    input.type = 'text';
    input.name = name;
    return input;
  }
}
