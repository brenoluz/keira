import InputBase from './input/base.js';
export default class Form {
    constructor() {
        this.elements = [];
        this.validators = [];
    }
    add(element) {
        if (element instanceof InputBase) {
            this.elements.push(element);
        }
    }
    get_elements() {
        let elements = [];
        for (const element of this.elements) {
            elements = elements.concat(element.get_elements());
        }
        return elements;
    }
    add_validator(validator) {
        this.validators.push(validator);
    }
    is_valid_form(extra_context) {
        const values = this.get_values();
        const v_clone = [...this.validators];
        v_clone.reverse();
        const v_func = (validator) => {
            if (!validator)
                return Promise.resolve(true);
            return validator.is_valid(values, extra_context).then((resp) => {
                if (!resp)
                    return Promise.resolve(false);
                const next_validator = v_clone.pop();
                return v_func(next_validator);
            });
        };
        return v_func(v_clone.pop());
    }
    is_valid(extra_context) {
        const promises = [];
        for (const element of this.elements) {
            promises.push(element.is_valid(extra_context));
        }
        return Promise.all(promises).then((data) => {
            const args = Array.prototype.slice.call(data);
            const res = args.indexOf(false) < 0;
            if (!res)
                return Promise.resolve(false);
            return this.is_valid_form(extra_context);
        });
    }
    set_values(values) {
        for (const element of this.elements) {
            const name = element.get_name();
            if (values.hasOwnProperty(name)) {
                element.set_value(values[name]);
            }
        }
    }
    get_values() {
        const values = {};
        for (const element of this.elements) {
            Object.assign(values, element.get_values());
        }
        return values;
    }
}
//# sourceMappingURL=form.js.map