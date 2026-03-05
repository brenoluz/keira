import ValidatorBase from './base.js';

export default class ValidatorNotNull extends ValidatorBase {
  override is_valid(value: unknown, _extra?: unknown): Promise<boolean> {
    if (!value || value == '') {
      return Promise.resolve(false);
    }

    return Promise.resolve(true);
  }
}
