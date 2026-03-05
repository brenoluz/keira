export function ce(tag, arg1, arg2) {
    const args = [];
    if (arg1 !== undefined)
        args.push(arg1);
    if (arg2 !== undefined)
        args.push(arg2);
    let clas = '';
    let attrsObj = {};
    for (const item of args) {
        const type = typeof item;
        if (type === 'string' && typeof item === 'string') {
            clas += ' ' + item;
        }
        else if (type === 'object' && item !== null && typeof item !== 'string') {
            attrsObj = item;
        }
    }
    const element = document.createElement(tag);
    if (!Element.prototype.append) {
        Element.prototype.append = Element.prototype.appendChild;
    }
    element.className = clas.trim();
    for (const attr in attrsObj) {
        if (attrsObj.hasOwnProperty(attr)) {
            element.setAttribute(attr, String(attrsObj[attr]));
        }
    }
    element.append = function (child) {
        Element.prototype.append.call(this, child);
        return this;
    };
    element.text = function (text) {
        element.innerText = text;
        return this;
    };
    element.html = function (html) {
        element.innerHTML = html;
        return this;
    };
    return element;
}
window.ce = ce;
export default class View {
    constructor(C) {
        this.C = C;
        this.container = ce('div');
    }
    make() {
        return Promise.resolve();
    }
    toString() {
        return this.container.innerHTML;
    }
    remove() {
        this.container.remove();
    }
    async render() {
        await this.make();
        return Promise.resolve(this.container);
    }
}
//# sourceMappingURL=view.js.map