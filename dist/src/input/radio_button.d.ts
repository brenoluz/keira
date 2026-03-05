import InputBase from './base.js';
type RadioButtonOption = [string, string];
export default class InputRadioButton extends InputBase {
    list: RadioButtonOption[];
    constructor(name: string);
    get_value(): unknown;
    onchange(_object: InputRadioButton, _value: unknown): void;
    make_input(): HTMLDivElement;
    add(key: string, label: string): void;
}
export {};
//# sourceMappingURL=radio_button.d.ts.map