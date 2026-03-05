import InputBase from './base.js';

export default class InputText extends InputBase {
  override make_input(name: string): HTMLInputElement {
    const input = super.make_input(name) as HTMLInputElement;
    input.type = 'text';
    input.name = name;

    if (!!this.value && typeof this.value === 'string') {
      input.value = this.value;
    }

    if (!this.editable) {
      input.disabled = true;
    }

    return input;
  }
}
