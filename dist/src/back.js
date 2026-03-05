export default new class {
    constructor() {
        this.list = {};
        this.default = null;
        this.MENU = 8;
        this.OVERRIDE = 6;
        this.MODAL = 4;
        this.DIALOG = 3;
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
        var call = this.default;
        //9 is max priority
        for (var i = 0; i < 10; i++) {
            if (!!this.list[i]) {
                call = this.list[i];
                break;
            }
        }
        return call();
    }
};
//# sourceMappingURL=back.js.map