import Base from './base';
export default class extends Base {
    make_input(name) {
        let input = super.make_input(name);
        input.type = 'hidden';
        return input;
    }
    display() {
        return '';
    }
}
//# sourceMappingURL=hidden.js.map