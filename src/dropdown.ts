import View, { ce, type ExtendedElement } from './view.js';

export default class Dropdown extends View {
  private _button: Element | null;
  private _itens: Element[];
  private _label: string | undefined;
  menu: Element | null;
  opacity: ExtendedElement | null;
  menu_show: boolean;

  constructor() {
    super(null);

    this._button = null;
    this._itens = [];
    this._label = undefined;

    this.menu = null;
    this.opacity = null;

    this.menu_show = false;

    this.container = ce('div', 'dropdown');
  }

  set_button(button: Element): void {
    this._button = button;
  }

  set_label(label: string): void {
    this._label = label;
  }

  override make(): Promise<void> {
    if (!!this._button) {
      this.container.append(this._button);
    }

    this.container.append(this.make_itens());

    return Promise.resolve();
  }

  make_button(text?: string, cls?: string): HTMLButtonElement {
    const button = ce('button', 'btn') as unknown as HTMLButtonElement;
    button.type = 'button';
    if (!!text) button.innerText = text;

    if (!!cls) button.classList.add(cls);

    button.onclick = () => {
      if (!!this.menu) {
        this.toggle();
      }
    };

    return button;
  }

  make_and_set_button(text?: string, cls?: string): HTMLButtonElement {
    const button = this.make_button(text, cls);
    this.set_button(button);

    return button;
  }

  make_item(label?: string): HTMLButtonElement {
    const button = ce('button', 'dropdown-item') as unknown as HTMLButtonElement;
    button.type = 'button';
    if (!!label) button.innerText = label;

    return button;
  }

  add(item: Element): void {
    this._itens.push(item);
  }

  make_and_add_item(label?: string): HTMLButtonElement {
    const item = this.make_item(label);
    this.add(item);

    return item;
  }

  toggle(): void {
    if (!!this.menu_show) {
      this.hide();
    } else {
      this.show();
    }
  }

  show(): void {
    this.menu_show = true;

    this.opacity = ce('div');
    this.opacity.style.position = 'fixed';
    this.opacity.style.top = '0';
    this.opacity.style.left = '0';
    this.opacity.style.width = '100vw';
    this.opacity.style.height = '100vh';

    this.opacity.onclick = this.hide.bind(this);

    document.body.append(this.opacity);

    if (!!this.menu) {
      this.menu.classList.add('show');
    }
  }

  hide(): void {
    if (this.opacity) {
      this.opacity.remove();
    }
    this.menu_show = false;

    if (!!this.menu) {
      this.menu.classList.remove('show');
    }
  }

  make_itens(): Element {
    this.menu = ce('div', 'dropdown-menu');

    for (const item of this._itens) {
      if (this.menu) {
        this.menu.append(item);
      }
    }

    return this.menu;
  }

  override remove(): void {
    super.remove();
    if (this.opacity) {
      this.opacity.remove();
    }
  }
}
