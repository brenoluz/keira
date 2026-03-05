import InputBase from './base.js';
type RadioOption = [string, string, string?];
export default class InputRadio extends InputBase {
    list: RadioOption[];
    constructor(name: string);
    get_value(): unknown;
    display(): string;
    onchange(_object: InputRadio, _value: unknown): void;
    make_input(): HTMLDivElement;
    private make_tooltip;
    add(key: string, label: string, help?: string): void;
}
export {};
//# sourceMappingURL=radio.d.ts.map