import Modal from '../modal.js';
import { ce, type ExtendedElement } from '../view.js';

// Type for translation function result
interface TranslationResult {
  text: string;
}

// Declare global _ function if it exists
declare function _(key: string): TranslationResult;

export default class Alert extends Modal {
  message: string;

  constructor(msg: string) {
    super(null);
    this.message = msg;
  }

  set_message(msg: string): void {
    this.message = msg;
  }

  override render(): Promise<ExtendedElement> {
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
