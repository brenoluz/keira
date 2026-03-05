import Base from './base';
export default class extends Base {
    make_input(name) {
        let input = super.make_input(name);
        input.type = 'text';
        return input;
    }
}
//# sourceMappingURL=text.js.map