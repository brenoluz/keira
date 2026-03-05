import InputBase from './base.js';

export default class InputDate extends InputBase {
  format: string | null;

  constructor(name: string) {
    super(name);
    this.format = null;
  }

  override make_input(name: string): HTMLInputElement {
    const input = document.createElement('input');
    input.className = 'form-control';
    input.name = name;

    if (!!this.value && typeof this.value === 'string') {
      input.value = this.value;
    }

    if (!this.editable) {
      input.disabled = true;
    }

    return input;
  }

  get_format(): string {
    if (!this.format) {
      this.format = new Date('2000/11/30')
        .toLocaleDateString()
        .replace('2000', 'aaaa')
        .replace('11', 'MM')
        .replace('30', 'dd');
    }

    return this.format;
  }
}
