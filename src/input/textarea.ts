import InputBase from './base.js';
import type { ExtendedElement } from '../view.js';

export default class InputTextarea extends InputBase {
  private _rows: number;
  private _maxlength: number;

  constructor(name: string) {
    super(name);
    this._rows = 2;
    this._maxlength = 100;
  }

  rows(length: number): void {
    this._rows = length;
  }

  maxlength(length: number): void {
    this._maxlength = length;
  }

  override make_input(name: string): HTMLTextAreaElement {
    const textareaEl = document.createElement('textarea');
    textareaEl.className = 'w-100';
    textareaEl.rows = this._rows;
    textareaEl.maxLength = this._maxlength;
    textareaEl.name = name;

    if (!!this.value && typeof this.value === 'string') {
      textareaEl.innerText = this.value;
    }

    return textareaEl;
  }
}
