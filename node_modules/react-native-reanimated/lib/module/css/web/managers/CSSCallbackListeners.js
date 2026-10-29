'use strict';

import { CSSCallbackStore } from "../../models/index.js";
export class CSSCallbackListeners extends CSSCallbackStore {
  attachedListeners = new Map();
  constructor(element, eventNameByProp, buildPayload) {
    super(Object.keys(eventNameByProp));
    this.element = element;
    this.eventNameByProp = eventNameByProp;
    this.buildPayload = buildPayload;
  }
  onPresenceChanged(present) {
    for (const [prop, listener] of this.attachedListeners) {
      if (!present.has(prop)) {
        this.attachedListeners.delete(prop);
        this.element.removeEventListener(this.eventNameByProp[prop], listener);
      }
    }
    for (const prop of present) {
      if (this.attachedListeners.has(prop)) {
        continue;
      }
      const listener = this.createListener(prop);
      this.attachedListeners.set(prop, listener);
      this.element.addEventListener(this.eventNameByProp[prop], listener);
    }
  }
  createListener(prop) {
    return event => {
      // Animation/transition events bubble; only handle this element's own.
      if (event.target !== this.element) {
        return;
      }
      this.invoke(prop, this.buildPayload(event));
    };
  }
}
//# sourceMappingURL=CSSCallbackListeners.js.map