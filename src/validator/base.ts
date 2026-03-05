export default class ValidatorBase {
  error_message: string;

  constructor(error_message: string) {
    this.error_message = error_message;
  }

  is_valid(value: unknown, extra?: unknown): Promise<boolean> {
    return Promise.reject('Method isValid not implemented!');
  }

  get_error(): Promise<string> {
    return Promise.resolve(this.error_message);
  }
}
