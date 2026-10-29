'use strict';

import { CSS_EVENT_MASK } from "./types.js";
export const ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE = {
  animationStart: 'onCSSAnimationStart',
  animationEnd: 'onCSSAnimationEnd',
  animationIteration: 'onCSSAnimationIteration',
  animationCancel: 'onCSSAnimationCancel'
};
export const TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE = {
  transitionRun: 'onCSSTransitionRun',
  transitionStart: 'onCSSTransitionStart',
  transitionEnd: 'onCSSTransitionEnd',
  transitionCancel: 'onCSSTransitionCancel'
};

/** Inverse of a prop table, so each pairing is written down only once. */

function invertPropTable(map) {
  return Object.fromEntries(Object.entries(map).map(([type, prop]) => [prop, type]));
}
const ANIMATION_EVENT_TYPE_BY_PROP = invertPropTable(ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE);
const TRANSITION_EVENT_TYPE_BY_PROP = invertPropTable(TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE);
export function getAnimationEventMaskFromProps(props) {
  let mask = 0;
  for (const prop of props) {
    mask |= CSS_EVENT_MASK[ANIMATION_EVENT_TYPE_BY_PROP[prop]];
  }
  return mask;
}
export function getTransitionEventMaskFromProps(props) {
  let mask = 0;
  for (const prop of props) {
    mask |= CSS_EVENT_MASK[TRANSITION_EVENT_TYPE_BY_PROP[prop]];
  }
  return mask;
}
//# sourceMappingURL=mask.js.map