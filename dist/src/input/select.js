import InputBase from './base.js';
export default class InputSelect extends InputBase {
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
        const selectEl = document.createElement('select');
        selectEl.className = 'pl-3';
        const style = selectEl.style;
        style.display = 'inline-block';
        style.width = '100%';
        style.height = 'calc(1.5em + .75rem + 2px)';
        style.padding = '.375rem 1.75rem .375rem .75rem';
        style.fontSize = '1rem';
        style.fontWeight = '400';
        style.lineHeight = '1.5';
        style.color = '#495057';
        style.verticalAlign = 'middle';
        style.background = '#fff';
        selectEl.name = this.name;
        selectEl.onchange = () => {
            this.value = selectEl.value;
            this.onchange(this, this.value);
        };
        if (!this.editable) {
            selectEl.disabled = true;
        }
        for (const item of this.list) {
            const key = item[0];
            const option = document.createElement('option');
            selectEl.append(option);
            if (!!key) {
                option.value = key;
            }
            else {
                option.style.display = 'none';
            }
            option.innerText = item[1];
            if (this.value == key) {
                option.selected = true;
            }
        }
        return selectEl;
    }
    add(key, label) {
        this.list.push([key, label]);
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
}
//# sourceMappingURL=select.js.map