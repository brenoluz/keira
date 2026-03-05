export default class ValidatorBase {
    constructor(error_message) {
        this.error_message = error_message;
    }
    is_valid(value, extra) {
        return Promise.reject('Method isValid not implemented!');
    }
    get_error() {
        return Promise.resolve(this.error_message);
    }
}
//# sourceMappingURL=base.js.map