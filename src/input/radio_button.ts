import InputBase from './base.js';

type RadioButtonOption = [string, string];

export default class InputRadioButton extends InputBase {
  list: RadioButtonOption[];

  constructor(name: string) {
    super(name);
    this.list = [];
  }

  override get_value(): unknown {
    return this.value;
  }

  onchange(_object: InputRadioButton, _value: unknown): void {
    // method for override
  }

  override make_input(): HTMLDivElement {
    const inputs = document.createElement('div');
    inputs.className = 'btn-group btn-group-toggle d-block';
    inputs.setAttribute('data-toggle', 'buttons');

    for (const item of this.list) {
      const key = item[0];
      const text = item[1];

      const label = document.createElement('label');
      label.className = 'btn btn-secondary';
      inputs.append(label);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = this.name;
      input.value = key;
      input.onclick = () => {
        const last_value = this.value;
        this.value = input.value;
        if (last_value != this.value) {
          this.onchange(this, this.value);
        }
      };

      label.append(input);

      if (!this.editable) {
        input.disabled = true;
      }

      if (this.value == key) {
        input.checked = true;
        label.classList.add('active');
      }

      const span = document.createElement('span');
      span.innerText = text;
      label.append(span);
    }

    return inputs;
  }

  add(key: string, label: string): void {
    this.list.push([key, label]);
  }
}
