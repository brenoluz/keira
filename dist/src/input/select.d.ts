import InputBase from './base.js';
type SelectOption = [string, string];
export default class InputSelect extends InputBase {
    list: SelectOption[];
    constructor(name: string);
    get_value(): unknown;
    onchange(_object: InputSelect, _value: unknown): void;
    make_input(): HTMLSelectElement;
    add(key: string, label: string): void;
    display(): string;
}
export {};
//# sourceMappingURL=select.d.ts.map