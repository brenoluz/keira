import Modal from '../modal.js';
import { ce } from '../view.js';
export default class Alert extends Modal {
    constructor(msg) {
        super(null);
        this.message = msg;
    }
    set_message(msg) {
        this.message = msg;
    }
    render() {
        return super.render().then(() => {
            return new Promise((resolve, _reject) => {
                if (this.header) {
                    this.header.innerHTML = '';
                }
                const msg = ce('h5');
                if (this.body) {
                    this.body.append(msg);
                }
                msg.innerText = this.message;
                const ok = ce('button', 'btn btn-secondary');
                ok.innerText = typeof _ !== 'undefined' ? _('vdok').text : 'OK';
                ok.onclick = () => {
                    this.remove();
                };
                if (this.footer) {
                    this.footer.append(ok);
                }
                resolve(this.container);
            });
        });
    }
}
//# sourceMappingURL=alert.js.map