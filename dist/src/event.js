export default new class Event {
    constructor() {
        this.listeners = {};
    }
    emit(name, data) {
        if (!this.listeners.hasOwnProperty(name)) {
            return Promise.resolve([]);
        }
        const promises = [];
        for (const func of this.listeners[name]) {
            promises.push(func(data));
        }
        return Promise.all(promises);
    }
    on(name, func) {
        if (!this.listeners.hasOwnProperty(name)) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(func);
    }
    remove_all(name) {
        if (!this.listeners.hasOwnProperty(name)) {
            return;
        }
        delete this.listeners[name];
    }
    remove(name, func) {
        if (!this.listeners.hasOwnProperty(name)) {
            return;
        }
        const listeners = this.listeners[name];
        for (let i = 0; i < listeners.length; i++) {
            if (listeners[i] === func) {
                this.listeners[name].splice(i, 1);
                break;
            }
        }
    }
}();
//# sourceMappingURL=event.js.map