import ValidatorBase from './base.js';
export default class ValidatorNotNull extends ValidatorBase {
    is_valid(value, _extra) {
        if (!value || value == '') {
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}
//# sourceMappingURL=not_null.js.map