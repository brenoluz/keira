type ListenerFunction = (data: unknown) => Promise<unknown>;
interface ListenerMap {
    [name: string]: ListenerFunction[];
}
declare const _default: {
    listeners: ListenerMap;
    emit(name: string, data?: unknown): Promise<unknown[]>;
    on(name: string, func: ListenerFunction): void;
    remove_all(name: string): void;
    remove(name: string, func: ListenerFunction): void;
};
export default _default;
//# sourceMappingURL=event.d.ts.map