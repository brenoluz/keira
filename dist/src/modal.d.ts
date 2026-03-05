import View, { type ExtendedElement } from './view.js';
export default class Modal extends View {
    titleText: string | null;
    header: Element | null;
    body: Element | null;
    footer: Element | null;
    opacity: ExtendedElement | null;
    backdropClose: boolean;
    constructor(C: import('./controller.js').default | null);
    set_title(title: string): void;
    render(): Promise<ExtendedElement>;
    show(): void;
    hide(): void;
    remove(): void;
    static set_document(document: Document): void;
    static get_document(): Document;
}
//# sourceMappingURL=modal.d.ts.map