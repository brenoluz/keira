import InputBase from './base.js';
export default class InputText extends InputBase {
    make_input(name) {
        const input = super.make_input(name);
        input.type = 'text';
        input.name = name;
        if (!!this.value && typeof this.value === 'string') {
            input.value = this.value;
        }
        if (!this.editable) {
            input.disabled = true;
        }
        return input;
    }
}
//# sourceMappingURL=text.js.map