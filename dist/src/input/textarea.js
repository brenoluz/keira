import InputBase from './base.js';
export default class InputTextarea extends InputBase {
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
        const textareaEl = document.createElement('textarea');
        textareaEl.className = 'w-100';
        textareaEl.rows = this._rows;
        textareaEl.maxLength = this._maxlength;
        textareaEl.name = name;
        if (!!this.value && typeof this.value === 'string') {
            textareaEl.innerText = this.value;
        }
        return textareaEl;
    }
}
//# sourceMappingURL=textarea.js.map