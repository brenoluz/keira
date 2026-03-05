interface ElementAttributes {
    [key: string]: string | number | boolean;
}
export interface ExtendedElement extends HTMLElement {
    append(child: Node): ExtendedElement;
    text(text: string): ExtendedElement;
    html(html: string): ExtendedElement;
}
export declare function ce(tag: string, className?: string, attrs?: ElementAttributes): ExtendedElement;
export declare function ce(tag: string, attrs?: ElementAttributes, className?: string): ExtendedElement;
declare global {
    interface Window {
        ce: typeof ce;
    }
}
export type Controller = import('./controller.js').default;
export default class View {
    protected C: Controller | null;
    container: ExtendedElement;
    constructor(C: Controller | null);
    make(): Promise<void>;
    toString(): string;
    remove(): void;
    render(): Promise<ExtendedElement>;
}
export {};
//# sourceMappingURL=view.d.ts.map