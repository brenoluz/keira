import View, { ce } from './view.js';
export default class Dropdown extends View {
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
    set_button(button) {
        this._button = button;
    }
    set_label(label) {
        this._label = label;
    }
    make() {
        if (!!this._button) {
            this.container.append(this._button);
        }
        this.container.append(this.make_itens());
        return Promise.resolve();
    }
    make_button(text, cls) {
        const button = ce('button', 'btn');
        button.type = 'button';
        if (!!text)
            button.innerText = text;
        if (!!cls)
            button.classList.add(cls);
        button.onclick = () => {
            if (!!this.menu) {
                this.toggle();
            }
        };
        return button;
    }
    make_and_set_button(text, cls) {
        const button = this.make_button(text, cls);
        this.set_button(button);
        return button;
    }
    make_item(label) {
        const button = ce('button', 'dropdown-item');
        button.type = 'button';
        if (!!label)
            button.innerText = label;
        return button;
    }
    add(item) {
        this._itens.push(item);
    }
    make_and_add_item(label) {
        const item = this.make_item(label);
        this.add(item);
        return item;
    }
    toggle() {
        if (!!this.menu_show) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    show() {
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
    hide() {
        if (this.opacity) {
            this.opacity.remove();
        }
        this.menu_show = false;
        if (!!this.menu) {
            this.menu.classList.remove('show');
        }
    }
    make_itens() {
        this.menu = ce('div', 'dropdown-menu');
        for (const item of this._itens) {
            if (this.menu) {
                this.menu.append(item);
            }
        }
        return this.menu;
    }
    remove() {
        super.remove();
        if (this.opacity) {
            this.opacity.remove();
        }
    }
}
//# sourceMappingURL=dropdown.js.map