import InputBase from './base.js';
export default class InputText extends InputBase {
    make_input(name) {
        const input = super.make_input(name);
        input.type = 'text';
        input.name = name;
        return input;
    }
}
//# sourceMappingURL=text.js.map