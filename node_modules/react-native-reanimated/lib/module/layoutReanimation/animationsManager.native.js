'use strict';

import { runOnUISync } from 'react-native-worklets';
import { cancelAnimation, withStyleAnimation } from "../animation/index.js";
import { LayoutAnimationType } from "../commonTypes.js";
import { getStaticFeatureFlag } from "../featureFlags/index.js";
import { mutableHostDecorator } from "../mutablesCommon.js";
const TAG_OFFSET = 1e9;
function makeMutableUI(initial) {
  'worklet';

  return mutableHostDecorator({
    value: initial
  });
}
const USE_ANIMATION_BACKEND = getStaticFeatureFlag('USE_ANIMATION_BACKEND');
function startObservingProgress(tag, sharedValue, scheduleFlush) {
  'worklet';

  sharedValue.addListener(tag + TAG_OFFSET, () => {
    global._notifyAboutProgress(tag, sharedValue.value);
    scheduleFlush();
  });
}
function stopObservingProgress(tag, sharedValue, scheduleFlush, removeView = false) {
  'worklet';

  sharedValue.removeListener(tag + TAG_OFFSET);
  global._notifyAboutEnd(tag, removeView);
  scheduleFlush();
}
function createLayoutAnimationManager() {
  'worklet';

  const currentAnimationForTag = new Map();
  const mutableValuesForTag = new Map();

  // Layout animation starts are scheduled separately on the UI runtime. With
  // a large number of views, sampling the clock for every start noticeably
  // staggers animations which belong to the same frame. Cache the first start
  // timestamp until the frame finalizers run so the whole batch shares one
  // timeline.
  let layoutAnimationStartTimestamp;
  const getLayoutAnimationStartTimestamp = () => {
    if (layoutAnimationStartTimestamp === undefined) {
      layoutAnimationStartTimestamp = global._getAnimationTimestamp();
      globalThis.requestAnimationFrameFinalizer(() => {
        layoutAnimationStartTimestamp = undefined;
      });
    }
    return layoutAnimationStartTimestamp;
  };

  // Flush layout-animation progress once per frame via the frame finalizer
  // (after all `requestAnimationFrame` callbacks), reusing the same
  // `_maybeFlushUIUpdatesQueue` path as animated-prop updates.
  // This finalizer runs after the mapper run (which re-queues itself a frame
  // ahead, so it sits earlier in the finalizer queue). When a mapper-driven
  // animation is also active, its flush runs first and already commits the
  // layout-animation updates too, so our `_maybeFlushUIUpdatesQueue` here is a
  // no-op; when only layout animations run, this is the single flush.
  // The backend drives its own flush from `runGrandCallback`, so this is non-backend only.
  let flushRequested = false;
  const scheduleFlush = () => {
    if (USE_ANIMATION_BACKEND || flushRequested) {
      return;
    }
    flushRequested = true;
    globalThis.requestAnimationFrameFinalizer(() => {
      flushRequested = false;
      global._maybeFlushUIUpdatesQueue();
    });
  };
  return {
    start(tag, type,
    /**
     * CreateLayoutAnimationManager creates an animation manager for Layout
     * animations.
     */
    yogaValues, config) {
      const style = config(yogaValues);
      let currentAnimation = style.animations;

      // When layout animation is requested, but a previous one is still running, we merge
      // new layout animation targets into the ongoing animation
      const previousAnimation = currentAnimationForTag.get(tag);
      if (previousAnimation) {
        currentAnimation = {
          ...previousAnimation,
          ...style.animations
        };
      }
      currentAnimationForTag.set(tag, currentAnimation);
      let value = mutableValuesForTag.get(tag);
      if (value === undefined) {
        value = makeMutableUI(style.initialValues);
        mutableValuesForTag.set(tag, value);
      } else {
        stopObservingProgress(tag, value, scheduleFlush);
        value._value = style.initialValues;
      }
      const animation = withStyleAnimation(currentAnimation, finished => {
        if (finished) {
          currentAnimationForTag.delete(tag);
          mutableValuesForTag.delete(tag);
          const shouldRemoveView = type === LayoutAnimationType.EXITING;
          stopObservingProgress(tag, value, scheduleFlush, shouldRemoveView);
        }
        if (style.callback) {
          style.callback(finished);
        }
      });
      startObservingProgress(tag, value, scheduleFlush);
      const previousFrameTimestamp = global.__frameTimestamp;
      global.__frameTimestamp ??= getLayoutAnimationStartTimestamp();
      value.value = animation;
      global.__frameTimestamp = previousFrameTimestamp;
    },
    stop(tag) {
      const value = mutableValuesForTag.get(tag);
      if (!value) {
        return;
      }
      // native already made its cleanup, so we just do cleanup here on JS side
      value.removeListener(tag + TAG_OFFSET);
      cancelAnimation(value);
      currentAnimationForTag.delete(tag);
      mutableValuesForTag.delete(tag);
    }
  };
}

// is-tree-shakable-suppress
runOnUISync(() => {
  'worklet';

  global.LayoutAnimationsManager = createLayoutAnimationManager();
});
//# sourceMappingURL=animationsManager.native.js.map