import View, { ce } from '../view.js';

export default class Loading extends View {
  constructor() {
    super(null);
    this.container = ce('div', 'spinner-grow text-info');
  }

  override make(): Promise<void> {
    const span = ce('span', 'spinner-grow text-info');
    this.container.append(span); // Fixed bug: was this.container.container(span)
    return Promise.resolve();
  }
}
