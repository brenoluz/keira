import Base from './base';
export default class extends Base {
    constructor(name) {
        super(name);
        this._rows = 2;
        this._maxlength = 100;
    }
    rows(length) {
        this._rows = length;
    }
    maxlength(length) {
        this._maxlength = length;
    }
    make_input(name) {
        let input = ce('textarea', 'w-100');
        input.rows = this._rows;
        input.maxlength = this._maxlength;
        input.name = name;
        if (!!this.value) {
            input.innerText = this.value;
        }
        return input;
    }
}
//# sourceMappingURL=textarea.js.map