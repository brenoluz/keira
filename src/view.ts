// Type for element attributes
interface ElementAttributes {
  [key: string]: string | number | boolean;
}

// Extended HTMLElement with custom methods
export interface ExtendedElement extends HTMLElement {
  append(child: Node): ExtendedElement;
  text(text: string): ExtendedElement;
  html(html: string): ExtendedElement;
}

// ce function with overloads
export function ce(tag: string, className?: string, attrs?: ElementAttributes): ExtendedElement;
export function ce(tag: string, attrs?: ElementAttributes, className?: string): ExtendedElement;
export function ce(
  tag: string,
  arg1?: string | ElementAttributes,
  arg2?: string | ElementAttributes
): ExtendedElement {
  const args: Array<string | ElementAttributes> = [];
  if (arg1 !== undefined) args.push(arg1);
  if (arg2 !== undefined) args.push(arg2);

  let clas = '';
  let attrsObj: ElementAttributes = {};

  for (const item of args) {
    const type = typeof item;

    if (type === 'string' && typeof item === 'string') {
      clas += ' ' + item;
    } else if (type === 'object' && item !== null && typeof item !== 'string') {
      attrsObj = item;
    }
  }

  const element = document.createElement(tag) as ExtendedElement;

  if (!Element.prototype.append) {
    Element.prototype.append = Element.prototype.appendChild;
  }

  element.className = clas.trim();

  for (const attr in attrsObj) {
    if (attrsObj.hasOwnProperty(attr)) {
      element.setAttribute(attr, String(attrsObj[attr]));
    }
  }

  element.append = function (child: Node): ExtendedElement {
    Element.prototype.append.call(this, child);
    return this;
  };

  element.text = function (text: string): ExtendedElement {
    element.innerText = text;
    return this;
  };

  element.html = function (html: string): ExtendedElement {
    element.innerHTML = html;
    return this;
  };

  return element;
}

// Make ce available globally
declare global {
  interface Window {
    ce: typeof ce;
  }
}

window.ce = ce;

// Forward reference to Controller
export type Controller = import('./controller.js').default;

export default class View {
  protected C: Controller | null;
  container: ExtendedElement;

  constructor(C: Controller | null) {
    this.C = C;
    this.container = ce('div');
  }

  make(): Promise<void> {
    return Promise.resolve();
  }

  toString(): string {
    return this.container.innerHTML;
  }

  remove(): void {
    this.container.remove();
  }

  async render(): Promise<ExtendedElement> {
    await this.make();
    return Promise.resolve(this.container);
  }
}
