import InputBase from './base.js';
export default class InputRadioButton extends InputBase {
    constructor(name) {
        super(name);
        this.list = [];
    }
    get_value() {
        return this.value;
    }
    onchange(_object, _value) {
        // method for override
    }
    make_input() {
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
    add(key, label) {
        this.list.push([key, label]);
    }
}
//# sourceMappingURL=radio_button.js.map