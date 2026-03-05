import View from './view';
let local_document = window.document;
export default class Modal extends View {
    constructor(C) {
        super(C);
        this.titleText = null;
        this.header = null;
        this.body = null;
        this.footer = null;
        this.opacity = null;
        this.backdropClose = false;
    }
    set_title(title) {
        this.titleText = title;
    }
    render() {
        this.container = ce('div', 'modal fade show');
        this.container.onclick = (e) => {
            if (!!this.backdropClose && e.target == e.currentTarget)
                this.remove();
        };
        let dialog = ce('div', 'modal-dialog modal-dialog-scrollable');
        this.container.append(dialog);
        let content = ce('div', 'modal-content');
        dialog.append(content);
        this.header = ce('div', 'modal-header');
        content.append(this.header);
        this.body = ce('div', 'modal-body');
        content.append(this.body);
        this.footer = ce('div', 'modal-footer');
        content.append(this.footer);
        return this.make().then(() => {
            if (!!this.titleText) {
                let title = ce('h5', 'modal-title');
                this.header.append(title);
                title.innerText = this.titleText;
            }
            let button = ce('button', 'close');
            this.header.append(button);
            button.onclick = this.remove.bind(this);
            let span = ce('span');
            button.append(span);
            span.style.fontSiza = '16px';
            span.innerText = 'x';
            this.show();
            return Promise.resolve();
        });
    }
    show() {
        let container = Modal.get_document().body;
        console.log('show', container);
        this.opacity = ce('div', 'modal-backdrop fade show');
        container.append(this.container);
        container.append(this.opacity);
        this.container.style.display = 'block';
    }
    hide() {
        this.opacity.remove();
        this.container.style.display = 'none';
    }
    remove() {
        console.warn('MODAL REMOVE');
        super.remove();
        this.opacity.remove();
    }
    static set_document(document) {
        local_document = document;
    }
    static get_document() {
        return local_document;
    }
}
//# sourceMappingURL=modal.js.map