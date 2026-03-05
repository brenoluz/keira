import Base from './base';
import Modal from '../modal';
export default class extends Base {
    constructor(name) {
        super(name);
        this.list = [];
    }
    get_value() {
        return this.value;
    }
    onchange(object, value) {
        /* method for overwrite */
    }
    make_input() {
        let inputs = ce('select', 'pl-3');
        let style = inputs.style;
        style.display = "inline-block";
        style.width = "100%";
        style.height = "calc(1.5em + .75rem + 2px)";
        style.padding = ".375rem 1.75rem .375rem .75rem";
        style.fontSize = "1rem";
        style.fontWeight = "400";
        style.lineHeight = "1.5";
        style.color = "#495057";
        style.verticalAlign = "middle";
        style.background = "#fff";
        inputs.name = this.name;
        inputs.onchange = event => {
            this.value = inputs.value;
            this.onchange(this, this.value);
        };
        if (!this.editable) {
            inputs.disabled = 'disabled';
        }
        for (let item of this.list) {
            let key = item[0];
            let option = ce('option');
            inputs.append(option);
            if (!!key) {
                option.value = key;
            }
            else {
                option.style.display = 'none';
            }
            option.innerText = item[1];
            if (this.value == key) {
                option.selectd = 'selected';
            }
        }
        return inputs;
    }
    add(key, label) {
        this.list.push([key, label]);
    }
    display() {
        let value = this.get_value();
        for (let item of this.list) {
            if (item[0] == value) {
                return item[1];
            }
        }
        if (!value || value == '') {
            return '---';
        }
    }
}
//# sourceMappingURL=select.js.map