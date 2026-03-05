import Base from './base';
export default class extends Base {
    constructor(name) {
        super(name);
        this.list = [];
    }
    onchange(object, value) {
        /* method for overwrite */
    }
    get_value() {
        return this.value;
    }
    make_input() {
        let inputs = ce('div', 'btn-group btn-group-toggle d-block');
        inputs.dataTaggle = 'buttons';
        for (let item of this.list) {
            let key = item[0];
            let text = item[1];
            let label = ce('label', 'btn btn-secondary');
            inputs.append(label);
            let input = ce('input');
            input.type = 'radio';
            input.name = this.name;
            input.value = key;
            input.onclick = event => {
                let last_value = this.value;
                this.value = input.value;
                if (last_value != this.value) {
                    this.onchange(this, this.value);
                }
            };
            label.append(input);
            if (!this.editable) {
                input.disabled = 'disabled';
            }
            if (this.value == key) {
                input.checked = 'checked';
                label.classList.add('active');
            }
            let span = ce('span');
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