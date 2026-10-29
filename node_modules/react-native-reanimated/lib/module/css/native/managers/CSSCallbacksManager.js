'use strict';

import { CSSCallbackStore } from "../../models/index.js";
import { ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE, cssCallbacksRegistry, getAnimationEventMaskFromProps, getTransitionEventMaskFromProps, TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE } from "../events/index.js";

// The registry routes by view tag, so a view with both kinds gets all of its
// events here. Each table doubles as the check for which kind an event is.

const isAnimationEvent = event => event.type in ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE;
const isTransitionEvent = event => event.type in TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE;

/** The view's animation callbacks, and the mask of the events they need. */
class AnimationCallbacks extends CSSCallbackStore {
  eventMask = 0;
  constructor(onMaskChange) {
    super(Object.values(ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE));
    this.onMaskChange = onMaskChange;
  }
  getMask() {
    return this.eventMask;
  }
  handleEvent(event) {
    this.invoke(ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE[event.type], {
      animationName: event.name,
      elapsedTime: event.elapsedTime
    });
  }
  onPresenceChanged(present) {
    this.eventMask = getAnimationEventMaskFromProps(present);
    this.onMaskChange();
  }
}

/** The view's transition callbacks, and the mask of the events they need. */
class TransitionCallbacks extends CSSCallbackStore {
  eventMask = 0;
  constructor(onMaskChange) {
    super(Object.values(TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE));
    this.onMaskChange = onMaskChange;
  }
  getMask() {
    return this.eventMask;
  }
  handleEvent(event) {
    this.invoke(TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE[event.type], {
      propertyName: event.name,
      elapsedTime: event.elapsedTime
    });
  }
  onPresenceChanged(present) {
    this.eventMask = getTransitionEventMaskFromProps(present);
    this.onMaskChange();
  }
}
export default class CSSCallbacksManager {
  constructor(viewTag) {
    this.viewTag = viewTag;
    const updateRegistration = () => this.updateRegistration();
    this.animationCallbacks = new AnimationCallbacks(updateRegistration);
    this.transitionCallbacks = new TransitionCallbacks(updateRegistration);
  }
  getAnimationEventMask() {
    return this.animationCallbacks.getMask();
  }
  getTransitionEventMask() {
    return this.transitionCallbacks.getMask();
  }
  syncAnimationCallbacks(callbacks) {
    this.animationCallbacks.sync(callbacks ?? {});
  }
  syncTransitionCallbacks(callbacks) {
    this.transitionCallbacks.sync(callbacks ?? {});
  }
  detach() {
    this.animationCallbacks.detach();
    this.transitionCallbacks.detach();
  }

  /**
   * Unsubscribes without dropping the callbacks, so a cancel already emitted
   * for the unmounting view still reaches the user.
   */
  retire() {
    if (this.viewTag !== -1) {
      cssCallbacksRegistry.retire(this.viewTag, this);
    }
  }
  handleCSSEvent(event) {
    if (isAnimationEvent(event)) {
      this.animationCallbacks.handleEvent(event);
    } else if (isTransitionEvent(event)) {
      this.transitionCallbacks.handleEvent(event);
    }
  }
  updateRegistration() {
    if (this.viewTag === -1) {
      return;
    }
    if (this.getAnimationEventMask() | this.getTransitionEventMask()) {
      cssCallbacksRegistry.register(this.viewTag, this);
    } else {
      cssCallbacksRegistry.unregister(this.viewTag, this);
    }
  }
}
//# sourceMappingURL=CSSCallbacksManager.js.map