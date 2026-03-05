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
    onchange(object, value) {
        /* method for overwrite */
    }
    make_input() {
        let inputs = ce('div', 'pl-3');
        for (let item of this.list) {
            let div = ce('div', 'row');
            inputs.append(div);
            let key = item[0];
            let input = ce('input', 'col-1');
            input.type = 'radio';
            input.id = key;
            input.name = this.name;
            input.value = key;
            input.onclick = event => {
                let last_value = this.value;
                this.value = input.value;
                if (last_value != this.value) {
                    this.onchange(this, this.value);
                }
            };
            div.append(input);
            if (!this.editable) {
                input.disabled = 'disabled';
            }
            if (this.value == key) {
                input.checked = 'checked';
            }
            let style = input.style;
            style.width = '24px';
            style.height = '1.4em';
            style.boder = '0px';
            let label = ce('label', 'col-9');
            label.setAttribute('for', key);
            label.innerText = item[1];
            div.append(label);
            if (!!item[2]) {
                let info = ce('span', 'material-icons col-1');
                info.innerText = 'info';
                div.append(info);
                let tooltip = this.make_tooltip(label, item[2]);
                tooltip.innerText = item[2];
                label.append(tooltip);
                div.onclick = event => {
                    let local_document = Modal.get_document();
                    let tooltips = local_document.querySelectorAll('.tooltip');
                    for (let t of tooltips) {
                        t.style.visibility = 'hidden';
                        t.style.opacity = '0';
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
    make_tooltip() {
        let tooltip = ce('span', 'tooltip');
        let style = tooltip.style;
        style.visibility = "hidden";
        style.backgroundColor = "#555";
        style.color = "#fff";
        style.textAlign = "center";
        style.borderRadius = "6px";
        style.padding = "5px 3px";
        style.position = "absolute";
        style.zIndex = "1";
        style.bottom = "125%";
        style.left = "25%";
        style.width = "100%";
        style.marginLeft = "-60px";
        style.opacity = "0";
        style.transition = "opacity 0.3s";
        return tooltip;
    }
    add(key, label, help) {
        this.list.push([key, label, help]);
    }
}
//# sourceMappingURL=radio.js.map