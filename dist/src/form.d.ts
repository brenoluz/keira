import InputBase from './input/base.js';
import ValidatorBase from './validator/base.js';
export default class Form {
    elements: InputBase[];
    validators: ValidatorBase[];
    constructor();
    add(element: InputBase): void;
    get_elements(): InputBase[];
    add_validator(validator: ValidatorBase): void;
    is_valid_form(extra_context?: unknown): Promise<boolean>;
    is_valid(extra_context?: unknown): Promise<boolean>;
    set_values(values: Record<string, unknown>): void;
    get_values(): Record<string, unknown>;
}
//# sourceMappingURL=form.d.ts.map