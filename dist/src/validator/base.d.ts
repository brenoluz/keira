export default class ValidatorBase {
    error_message: string;
    constructor(error_message: string);
    is_valid(value: unknown, extra?: unknown): Promise<boolean>;
    get_error(): Promise<string>;
}
//# sourceMappingURL=base.d.ts.map