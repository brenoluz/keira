import Modal from '../modal.js';
import { type ExtendedElement } from '../view.js';
export default class Alert extends Modal {
    message: string;
    constructor(msg: string);
    set_message(msg: string): void;
    render(): Promise<ExtendedElement>;
}
//# sourceMappingURL=alert.d.ts.map