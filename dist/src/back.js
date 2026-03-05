export default new class Back {
    constructor() {
        this.MENU = 8;
        this.OVERRIDE = 6;
        this.MODAL = 4;
        this.DIALOG = 3;
        this.list = {};
        this.default = null;
    }
    add(priority, cb) {
        this.list[priority] = cb;
    }
    clear() {
        this.list = {};
    }
    set_default(cb) {
        this.default = cb;
    }
    remove(priority) {
        delete this.list[priority];
    }
    override(cb) {
        this.add(this.OVERRIDE, cb);
    }
    back() {
        let call = this.default;
        // 9 is max priority
        for (let i = 0; i < 10; i++) {
            if (!!this.list[i]) {
                call = this.list[i];
                break;
            }
        }
        return call ? call() : undefined;
    }
}();
//# sourceMappingURL=back.js.map