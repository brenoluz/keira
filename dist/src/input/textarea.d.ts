import InputBase from './base.js';
export default class InputTextarea extends InputBase {
    private _rows;
    private _maxlength;
    constructor(name: string);
    rows(length: number): void;
    maxlength(length: number): void;
    make_input(name: string): HTMLTextAreaElement;
}
//# sourceMappingURL=textarea.d.ts.map