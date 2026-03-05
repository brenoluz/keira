import InputBase from './input/base.js';
import ValidatorBase from './validator/base.js';

export default class Form {
  elements: InputBase[];
  validators: ValidatorBase[];

  constructor() {
    this.elements = [];
    this.validators = [];
  }

  add(element: InputBase): void {
    if (element instanceof InputBase) {
      this.elements.push(element);
    }
  }

  get_elements(): InputBase[] {
    let elements: InputBase[] = [];

    for (const element of this.elements) {
      elements = elements.concat(element.get_elements());
    }

    return elements;
  }

  add_validator(validator: ValidatorBase): void {
    this.validators.push(validator);
  }

  is_valid_form(extra_context?: unknown): Promise<boolean> {
    const values = this.get_values();
    const v_clone = [...this.validators];
    v_clone.reverse();

    const v_func = (validator: ValidatorBase | undefined): Promise<boolean> => {
      if (!validator) return Promise.resolve(true);

      return validator.is_valid(values, extra_context).then((resp: boolean) => {
        if (!resp) return Promise.resolve(false);

        const next_validator = v_clone.pop();
        return v_func(next_validator);
      });
    };

    return v_func(v_clone.pop());
  }

  is_valid(extra_context?: unknown): Promise<boolean> {
    const promises: Array<Promise<boolean>> = [];

    for (const element of this.elements) {
      promises.push(element.is_valid(extra_context));
    }

    return Promise.all(promises).then((data) => {
      const args = Array.prototype.slice.call(data);
      const res = args.indexOf(false) < 0;

      if (!res) return Promise.resolve(false);

      return this.is_valid_form(extra_context);
    });
  }

  set_values(values: Record<string, unknown>): void {
    for (const element of this.elements) {
      const name = element.get_name();
      if (values.hasOwnProperty(name)) {
        element.set_value(values[name]);
      }
    }
  }

  get_values(): Record<string, unknown> {
    const values: Record<string, unknown> = {};

    for (const element of this.elements) {
      Object.assign(values, element.get_values());
    }

    return values;
  }
}
