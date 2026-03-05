type CallbackFunction = () => unknown;
interface CallbackMap {
    [priority: number]: CallbackFunction;
}
declare const _default: {
    list: CallbackMap;
    default: CallbackFunction | null;
    readonly MENU: 8;
    readonly OVERRIDE: 6;
    readonly MODAL: 4;
    readonly DIALOG: 3;
    add(priority: number, cb: CallbackFunction): void;
    clear(): void;
    set_default(cb: CallbackFunction): void;
    remove(priority: number): void;
    override(cb: CallbackFunction): void;
    back(): unknown;
};
export default _default;
//# sourceMappingURL=back.d.ts.map