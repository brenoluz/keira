import Base from './base';
export default class extends Base {
    constructor(name) {
        super(name);
        this.format = null;
    }
    make_input(name) {
        let input = ce('input', 'form-control');
        input.name = name;
        if (!!this.value) {
            input.value = this.value;
        }
        if (!this.editable) {
            input.disabled = true;
        }
        return input;
    }
    get_format() {
        if (!this.format) {
            this.format = (new Date('2000/11/30')).toLocaleDateString().replace('2000', 'aaaa').replace('11', 'MM').replace('30', 'dd');
        }
        return this.format;
    }
}
//# sourceMappingURL=date.js.map