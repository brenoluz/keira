type CallbackFunction = () => unknown;

interface CallbackMap {
  [priority: number]: CallbackFunction;
}

export default new class Back {
  list: CallbackMap;
  default: CallbackFunction | null;
  readonly MENU = 8;
  readonly OVERRIDE = 6;
  readonly MODAL = 4;
  readonly DIALOG = 3;

  constructor() {
    this.list = {};
    this.default = null;
  }

  add(priority: number, cb: CallbackFunction): void {
    this.list[priority] = cb;
  }

  clear(): void {
    this.list = {};
  }

  set_default(cb: CallbackFunction): void {
    this.default = cb;
  }

  remove(priority: number): void {
    delete this.list[priority];
  }

  override(cb: CallbackFunction): void {
    this.add(this.OVERRIDE, cb);
  }

  back(): unknown {
    let call: CallbackFunction | null = this.default;

    // 9 is max priority
    for (let i = 0; i < 10; i++) {
      if (!!this.list[i]) {
        call = this.list[i];
        break;
      }
    }

    return call ? call() : undefined;
  }
}();
