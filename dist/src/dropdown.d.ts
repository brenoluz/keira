import View, { type ExtendedElement } from './view.js';
export default class Dropdown extends View {
    private _button;
    private _itens;
    private _label;
    menu: Element | null;
    opacity: ExtendedElement | null;
    menu_show: boolean;
    constructor();
    set_button(button: Element): void;
    set_label(label: string): void;
    make(): Promise<void>;
    make_button(text?: string, cls?: string): HTMLButtonElement;
    make_and_set_button(text?: string, cls?: string): HTMLButtonElement;
    make_item(label?: string): HTMLButtonElement;
    add(item: Element): void;
    make_and_add_item(label?: string): HTMLButtonElement;
    toggle(): void;
    show(): void;
    hide(): void;
    make_itens(): Element;
    remove(): void;
}
//# sourceMappingURL=dropdown.d.ts.map