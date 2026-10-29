'use strict';

import { isWorkletFunction, RuntimeKind, scheduleOnUI } from 'react-native-worklets';
import { decorateAnimation, IN_STYLE_UPDATER } from "./utilCommon.js";
export { getReduceMotionForAnimation, getReduceMotionFromConfig, initialUpdaterRun, isValidLayoutAnimationProp, recognizePrefixSuffix } from "./utilCommon.js";
export function assertEasingIsWorklet(easing) {
  'worklet';

  if (globalThis.__RUNTIME_KIND !== RuntimeKind.ReactNative) {
    // If this is called on UI (for example from gesture handler with worklets), we don't get easing,
    // but its bound copy, which is not a worklet. We don't want to throw any error then.
    return;
  }
  // @ts-ignore typescript wants us to use `in` instead, which doesn't work with host objects
  if (easing?.factory) {
    return;
  }
  if (!isWorkletFunction(easing)) {
    throw new Error('[Reanimated] The easing function is not a worklet. Please make sure you import `Easing` from react-native-reanimated.');
  }
}
export function defineAnimation(starting, factory) {
  'worklet';

  if (globalThis.__RUNTIME_KIND === RuntimeKind.ReactNative && IN_STYLE_UPDATER.current) {
    return starting;
  }
  const create = () => {
    'worklet';

    const animation = factory();
    decorateAnimation(animation);
    return animation;
  };
  if (globalThis.__RUNTIME_KIND !== RuntimeKind.ReactNative) {
    return create();
  }
  create.__isAnimationDefinition = true;

  // @ts-expect-error it's fine
  return create;
}

/**
 * Lets you cancel a running animation paired to a shared value. The
 * cancellation is asynchronous.
 *
 * @param sharedValue - The shared value of a running animation that you want to
 *   cancel.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/core/cancelAnimation
 */
export function cancelAnimation(sharedValue) {
  'worklet';

  // setting the current value cancels the animation if one is currently running
  if (globalThis.__RUNTIME_KIND !== RuntimeKind.ReactNative) {
    sharedValue.value = sharedValue.value; // eslint-disable-line no-self-assign
  } else {
    scheduleOnUI(() => {
      'worklet';

      sharedValue.value = sharedValue.value; // eslint-disable-line no-self-assign
    });
  }
}
//# sourceMappingURL=util.native.js.map