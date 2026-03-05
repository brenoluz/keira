import InputBase from './base.js';
export default class InputHidden extends InputBase {
    make_input(name) {
        const input = super.make_input(name);
        input.type = 'hidden';
        input.name = name;
        return input;
    }
    display() {
        return '';
    }
}
//# sourceMappingURL=hidden.js.map