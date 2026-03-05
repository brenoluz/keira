import InputBase from './base.js';
export default class InputDate extends InputBase {
    format: string | null;
    constructor(name: string);
    make_input(name: string): HTMLInputElement;
    get_format(): string;
}
//# sourceMappingURL=date.d.ts.map