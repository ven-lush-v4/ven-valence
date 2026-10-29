'use strict';

/**
 * Holds the user's CSS callbacks and tracks which of them are present.
 *
 * Callbacks are read from a mutable slot at fire time, so a callback replaced
 * by a re-render can never fire, and re-created inline arrow functions cost
 * nothing. Subscription is driven by presence rather than identity, so
 * subclasses are only notified when a callback appears or disappears.
 */
export default class CSSCallbackStore {
  callbacks = {};
  present = new Set();
  constructor(props) {
    this.props = props;
  }
  sync(callbacks) {
    this.callbacks = callbacks;
    let changed = false;
    for (const prop of this.props) {
      const hasCallback = typeof callbacks[prop] === 'function';
      if (hasCallback && !this.present.has(prop)) {
        this.present.add(prop);
        changed = true;
      } else if (!hasCallback && this.present.has(prop)) {
        this.present.delete(prop);
        changed = true;
      }
    }
    if (changed) {
      this.onPresenceChanged(this.present);
    }
  }
  detach() {
    this.sync({});
  }
  invoke(prop, payload) {
    this.callbacks[prop]?.(payload);
  }

  /** Called only when the set changed, never when a callback is replaced. */
}
//# sourceMappingURL=CSSCallbackStore.js.map