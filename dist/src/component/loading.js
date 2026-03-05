import View from '../view';
export default class extends View {
    constructor() {
        this.container = ce('div', 'spinner-grow text-info');
    }
    make() {
        let span = ce('spinner-grow text-info');
        this.container.container(span);
        return Promise.resolve();
    }
}
//# sourceMappingURL=loading.js.map