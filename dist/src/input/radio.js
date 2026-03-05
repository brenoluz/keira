import InputBase from './base.js';
import Modal from '../modal.js';
export default class InputRadio extends InputBase {
    constructor(name) {
        super(name);
        this.list = [];
    }
    get_value() {
        return this.value;
    }
    display() {
        const value = this.get_value();
        for (const item of this.list) {
            if (item[0] == value) {
                return item[1];
            }
        }
        if (!value || value == '') {
            return '---';
        }
        return String(value);
    }
    onchange(_object, _value) {
        // method for override
    }
    make_input() {
        const inputs = document.createElement('div');
        inputs.className = 'pl-3';
        for (const item of this.list) {
            const div = document.createElement('div');
            div.className = 'row';
            inputs.append(div);
            const key = item[0];
            const input = document.createElement('input');
            input.className = 'col-1';
            input.type = 'radio';
            input.id = key;
            input.name = this.name;
            input.value = key;
            input.onclick = () => {
                const last_value = this.value;
                this.value = input.value;
                if (last_value != this.value) {
                    this.onchange(this, this.value);
                }
            };
            div.append(input);
            if (!this.editable) {
                input.disabled = true;
            }
            if (this.value == key) {
                input.checked = true;
            }
            const style = input.style;
            style.width = '24px';
            style.height = '1.4em';
            style.border = '0px';
            const label = document.createElement('label');
            label.className = 'col-9';
            label.setAttribute('for', key);
            label.innerText = item[1];
            div.append(label);
            if (!!item[2]) {
                const info = document.createElement('span');
                info.className = 'material-icons col-1';
                info.innerText = 'info';
                div.append(info);
                const tooltip = this.make_tooltip(item[2]);
                label.append(tooltip);
                div.onclick = () => {
                    const local_document = Modal.get_document();
                    const tooltips = local_document.querySelectorAll('.tooltip');
                    for (let i = 0; i < tooltips.length; i++) {
                        const tEl = tooltips[i];
                        tEl.style.visibility = 'hidden';
                        tEl.style.opacity = '0';
                    }
                    tooltip.style.visibility = 'visible';
                    tooltip.style.opacity = '1';
                    setTimeout(() => {
                        tooltip.style.visibility = 'hidden';
                        tooltip.style.opacity = '0';
                    }, 5000);
                };
            }
        }
        return inputs;
    }
    make_tooltip(text) {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerText = text;
        const style = tooltip.style;
        style.visibility = 'hidden';
        style.backgroundColor = '#555';
        style.color = '#fff';
        style.textAlign = 'center';
        style.borderRadius = '6px';
        style.padding = '5px 3px';
        style.position = 'absolute';
        style.zIndex = '1';
        style.bottom = '125%';
        style.left = '25%';
        style.width = '100%';
        style.marginLeft = '-60px';
        style.opacity = '0';
        style.transition = 'opacity 0.3s';
        return tooltip;
    }
    add(key, label, help) {
        this.list.push([key, label, help]);
    }
}
//# sourceMappingURL=radio.js.map