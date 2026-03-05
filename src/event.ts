type ListenerFunction = (data: unknown) => Promise<unknown>;

interface ListenerMap {
  [name: string]: ListenerFunction[];
}

export default new class Event {
  listeners: ListenerMap;

  constructor() {
    this.listeners = {};
  }

  emit(name: string, data?: unknown): Promise<unknown[]> {
    if (!this.listeners.hasOwnProperty(name)) {
      return Promise.resolve([]);
    }

    const promises: Array<Promise<unknown>> = [];

    for (const func of this.listeners[name]) {
      promises.push(func(data));
    }

    return Promise.all(promises);
  }

  on(name: string, func: ListenerFunction): void {
    if (!this.listeners.hasOwnProperty(name)) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(func);
  }

  remove_all(name: string): void {
    if (!this.listeners.hasOwnProperty(name)) {
      return;
    }

    delete this.listeners[name];
  }

  remove(name: string, func: ListenerFunction): void {
    if (!this.listeners.hasOwnProperty(name)) {
      return;
    }

    const listeners = this.listeners[name];

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === func) {
        this.listeners[name].splice(i, 1);
        break;
      }
    }
  }
}();
