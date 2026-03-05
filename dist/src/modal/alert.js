import Modal from '../modal';
export default class extends Modal {
    constructor(msg) {
        super();
        this.message = msg;
    }
    set_message(msg) {
        this.message = msg;
    }
    render() {
        return super.render().then(() => {
            return new Promise((resolve, reject) => {
                this.header.innerHTML = '';
                let msg = ce('h5');
                this.body.append(msg);
                msg.innerText = this.message;
                let ok = ce('button', 'btn btn-secondary');
                ok.innerText = _('vdok').text;
                ok.onclick = () => {
                    resolve(false);
                    this.remove();
                };
                this.footer.append(ok);
            });
        });
    }
}
//# sourceMappingURL=alert.js.map