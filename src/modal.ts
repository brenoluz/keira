import View, { ce, type ExtendedElement } from './view.js';

let local_document: Document = window.document;

export default class Modal extends View {
  titleText: string | null;
  header: Element | null;
  body: Element | null;
  footer: Element | null;
  opacity: ExtendedElement | null;
  backdropClose: boolean;

  constructor(C: import('./controller.js').default | null) {
    super(C);

    this.titleText = null;
    this.header = null;
    this.body = null;
    this.footer = null;
    this.opacity = null;

    this.backdropClose = false;
  }

  set_title(title: string): void {
    this.titleText = title;
  }

  override async render(): Promise<ExtendedElement> {
    this.container = ce('div', 'modal fade show');
    this.container.onclick = (e: Event) => {
      if (!!this.backdropClose && e.target == e.currentTarget) {
        this.remove();
      }
    };

    const dialog = ce('div', 'modal-dialog modal-dialog-scrollable');
    this.container.append(dialog);

    const content = ce('div', 'modal-content');
    dialog.append(content);

    this.header = ce('div', 'modal-header');
    content.append(this.header);

    this.body = ce('div', 'modal-body');
    content.append(this.body);

    this.footer = ce('div', 'modal-footer');
    content.append(this.footer);

    await this.make();

    if (!!this.titleText) {
      const title = ce('h5', 'modal-title');
      if (this.header) {
        this.header.append(title);
      }
      title.innerText = this.titleText;
    }

    const button = ce('button', 'close');
    if (this.header) {
      this.header.append(button);
    }
    button.onclick = this.remove.bind(this);

    const span = ce('span');
    button.append(span);
    span.style.fontSize = '16px'; // Fixed typo: was fontSiza
    span.innerText = 'x';

    this.show();
    return Promise.resolve(this.container);
  }

  show(): void {
    const container = Modal.get_document().body;

    console.log('show', container);

    this.opacity = ce('div', 'modal-backdrop fade show');
    container.append(this.container);
    if (this.opacity) {
      container.append(this.opacity);
    }

    this.container.style.display = 'block';
  }

  hide(): void {
    if (this.opacity) {
      this.opacity.remove();
    }
    this.container.style.display = 'none';
  }

  override remove(): void {
    console.warn('MODAL REMOVE');

    super.remove();
    if (this.opacity) {
      this.opacity.remove();
    }
  }

  static set_document(document: Document): void {
    local_document = document;
  }

  static get_document(): Document {
    return local_document;
  }
}
