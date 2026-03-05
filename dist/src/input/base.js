import View, { ce } from '../view.js';
export default class InputBase extends View {
    constructor(name) {
        super(null); // Controller is not needed at this level
        this.validators = [];
        this.child_elements = [];
        this.child_container = null;
        this.name = name;
        this.label = null;
        this.help = null;
        this.input = null;
        this.value = null;
        this.editable = true;
        this.label_text = null;
        this.help_text = '';
        this.container = ce('div', 'form-group');
        this.error = ce('div', 'invalid-feedback');
    }
    get_elements() {
        let elements = [];
        elements.push(this);
        for (const child of this.child_elements) {
            elements = elements.concat(child.get_elements());
        }
        return elements;
    }
    get_values() {
        const values = {};
        for (const element of this.child_elements) {
            Object.assign(values, element.get_values());
        }
        values[this.name] = this.get_value();
        return values;
    }
    get_name() {
        return this.name;
    }
    get_value() {
        if (this.input) {
            this.value = this.input.value;
        }
        return this.value;
    }
    edit(flag) {
        this.editable = flag;
    }
    set_label(text) {
        this.label_text = text;
    }
    focus() {
        if (this.input) {
            this.input.focus();
        }
    }
    get_label() {
        return this.label_text;
    }
    display() {
        return this.get_value();
    }
    set_value(value) {
        this.value = value;
        if (!!this.input) {
            return this.make();
        }
        return Promise.resolve();
    }
    add_validator(validator) {
        this.validators.push(validator);
    }
    set_errors(errors) {
        this.clear_errors();
        const promises = [];
        for (const error of errors) {
            const div = ce('div');
            this.error.append(div);
            promises.push(new Promise((resolve, reject) => {
                error.then((resp) => {
                    div.innerText = resp;
                    this.error.style.display = 'block';
                    resolve();
                }, (rej) => reject(rej));
            }));
        }
        return Promise.all(promises).then(() => { });
    }
    clear_errors() {
        if (!!this.error) {
            this.error.innerHTML = '';
            this.error.style.display = 'none';
        }
    }
    async is_valid(extra_context) {
        this.clear_errors();
        const promises = [];
        const value = this.get_value();
        const errors = [];
        for (const validator of this.validators) {
            promises.push(validator.is_valid(value, extra_context).then((resp) => {
                if (!resp) {
                    const msg_error = validator.get_error();
                    errors.push(msg_error);
                }
                return Promise.resolve(resp);
            }));
        }
        for (const child of this.child_elements) {
            promises.push(child.is_valid(extra_context));
        }
        const data = await Promise.all(promises);
        const args = Array.prototype.slice.call(data);
        const resp = args.indexOf(false) < 0;
        await this.set_errors(errors);
        return Promise.resolve(resp);
    }
    set_help(text) {
        this.help_text = text;
    }
    async make() {
        const group = this.container;
        group.innerHTML = '';
        if (!!this.label_text) {
            const labelEl = this.make_label(this.label_text);
            this.label = labelEl;
            group.append(labelEl);
        }
        this.input = this.make_input(this.name);
        group.append(this.input);
        this.error = this.make_error();
        group.append(this.error);
        if (!!this.help_text) {
            const helpEl = this.make_help(this.help_text);
            this.help = helpEl;
            group.append(helpEl);
        }
        return Promise.resolve();
    }
    make_error() {
        const error = ce('div', 'invalid-feedback');
        return error;
    }
    make_label(text) {
        const label = ce('label');
        label.innerText = !!text ? text : '';
        return label;
    }
    make_input(name) {
        const input = ce('input', 'form-control');
        input.name = name;
        if (!!this.value && typeof this.value === 'string') {
            input.value = this.value;
        }
        if (!this.editable) {
            input.disabled = true;
        }
        return input;
    }
    make_help(text) {
        const small = ce('small', 'form-text text-muted');
        small.innerText = !!text ? text : '';
        return small;
    }
    remove_children() {
        if (!!this.child_container) {
            this.child_container.remove();
            this.child_container = null;
        }
        this.child_elements = [];
        return Promise.resolve();
    }
    append(child) {
        if (!this.child_container) {
            this.child_container = ce('div');
            this.container.after(this.child_container);
        }
        if (child instanceof InputBase) {
            this.child_elements.push(child);
            if (this.child_container) {
                this.child_container.append(child.container);
            }
        }
        else {
            if (this.child_container) {
                this.child_container.append(child);
            }
        }
    }
}
//# sourceMappingURL=base.js.map