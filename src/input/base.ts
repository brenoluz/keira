import View, { ce, type ExtendedElement } from '../view.js';
import type ValidatorBase from '../validator/base.js';

export default class InputBase extends View {
  name: string;
  label: Element | null;
  help: Element | null;
  input: HTMLElement | null;
  value: unknown;
  editable: boolean;
  label_text: string | null;
  help_text: string;
  validators: ValidatorBase[];
  child_elements: InputBase[];
  child_container: Element | null;
  error: ExtendedElement;

  constructor(name: string) {
    super(null); // Controller is not needed at this level

    this.validators = [];
    this.child_elements = [];
    this.child_container = null;

    this.name = name;
    this.label = null;
    this.help = null;
    this.input = null;
    this.value = null;

    this.editable = true;

    this.label_text = null;
    this.help_text = '';

    this.container = ce('div', 'form-group');
    this.error = ce('div', 'invalid-feedback');
  }

  get_elements(): InputBase[] {
    let elements: InputBase[] = [];
    elements.push(this);

    for (const child of this.child_elements) {
      elements = elements.concat(child.get_elements());
    }

    return elements;
  }

  get_values(): Record<string, unknown> {
    const values: Record<string, unknown> = {};

    for (const element of this.child_elements) {
      Object.assign(values, element.get_values());
    }

    values[this.name] = this.get_value();

    return values;
  }

  get_name(): string {
    return this.name;
  }

  get_value(): unknown {
    if (this.input && 'value' in this.input) {
      this.value = (this.input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
    }
    return this.value;
  }

  edit(flag: boolean): void {
    this.editable = flag;
  }

  set_label(text: string): void {
    this.label_text = text;
  }

  focus(): void {
    if (this.input && 'focus' in this.input) {
      (this.input as HTMLElement).focus();
    }
  }

  get_label(): string | null {
    return this.label_text;
  }

  display(): unknown {
    return this.get_value();
  }

  set_value(value: unknown): Promise<void> {
    this.value = value;

    if (!!this.input) {
      return this.make();
    }

    return Promise.resolve();
  }

  add_validator(validator: ValidatorBase): void {
    this.validators.push(validator);
  }

  set_errors(errors: Array<Promise<string>>): Promise<void> {
    this.clear_errors();
    const promises: Array<Promise<void>> = [];

    for (const error of errors) {
      const div = ce('div');
      this.error.append(div);
      promises.push(
        new Promise((resolve, reject) => {
          error.then(
            (resp: string) => {
              div.innerText = resp;
              this.error.style.display = 'block';
              resolve();
            },
            (rej: unknown) => reject(rej)
          );
        })
      );
    }

    return Promise.all(promises).then(() => {});
  }

  clear_errors(): void {
    if (!!this.error) {
      this.error.innerHTML = '';
      this.error.style.display = 'none';
    }
  }

  async is_valid(extra_context?: unknown): Promise<boolean> {
    this.clear_errors();

    const promises: Array<Promise<boolean>> = [];
    const value = this.get_value();
    const errors: Array<Promise<string>> = [];

    for (const validator of this.validators) {
      promises.push(
        validator.is_valid(value, extra_context).then((resp: boolean) => {
          if (!resp) {
            const msg_error = validator.get_error();
            errors.push(msg_error);
          }

          return Promise.resolve(resp);
        })
      );
    }

    for (const child of this.child_elements) {
      promises.push(child.is_valid(extra_context));
    }

    const data = await Promise.all(promises);
    const args = Array.prototype.slice.call(data);
    const resp = args.indexOf(false) < 0;

    await this.set_errors(errors);

    return Promise.resolve(resp);
  }

  set_help(text: string): void {
    this.help_text = text;
  }

  override async make(): Promise<void> {
    const group = this.container;
    group.innerHTML = '';

    if (!!this.label_text) {
      const labelEl = this.make_label(this.label_text);
      this.label = labelEl;
      group.append(labelEl);
    }

    this.input = this.make_input(this.name) as HTMLInputElement;
    group.append(this.input);

    this.error = this.make_error();
    group.append(this.error);

    if (!!this.help_text) {
      const helpEl = this.make_help(this.help_text);
      this.help = helpEl;
      group.append(helpEl);
    }

    return Promise.resolve();
  }

  make_error(): ExtendedElement {
    const error = ce('div', 'invalid-feedback');
    return error;
  }

  make_label(text: string): HTMLElement {
    const label = ce('label') as unknown as HTMLElement;
    label.innerText = !!text ? text : '';
    return label;
  }

  make_input(_name: string): HTMLElement {
    const input = ce('input', 'form-control') as unknown as HTMLElement;
    return input;
  }

  make_help(text: string): HTMLElement {
    const small = ce('small', 'form-text text-muted');
    small.innerText = !!text ? text : '';
    return small;
  }

  remove_children(): Promise<void> {
    if (!!this.child_container) {
      this.child_container.remove();
      this.child_container = null;
    }

    this.child_elements = [];

    return Promise.resolve();
  }

  append(child: InputBase | Element): void {
    if (!this.child_container) {
      this.child_container = ce('div');
      this.container.after(this.child_container);
    }

    if (child instanceof InputBase) {
      this.child_elements.push(child);
      if (this.child_container) {
        this.child_container.append(child.container);
      }
    } else {
      if (this.child_container) {
        this.child_container.append(child);
      }
    }
  }
}
