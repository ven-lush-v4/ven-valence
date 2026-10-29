'use strict';

import { logger } from "./common/index.js";
import { isFirstReactRender, isReactRendering } from "./reactUtils.js";
import { valueSetter } from "./valueSetter.js";
function shouldWarnAboutAccessDuringRender() {
  return __DEV__ && isReactRendering() && !isFirstReactRender();
}
export function checkInvalidReadDuringRender() {
  if (shouldWarnAboutAccessDuringRender()) {
    logger.warn("Reading from `value` during component render. Please ensure that you don't access the `value` property nor use `get` method of a shared value while React is rendering a component.", {
      strict: true
    });
  }
}
export function checkInvalidWriteDuringRender() {
  if (shouldWarnAboutAccessDuringRender()) {
    logger.warn("Writing to `value` during component render. Please ensure that you don't access the `value` property nor use `set` method of a shared value while React is rendering a component.", {
      strict: true
    });
  }
}
export function mutableHostDecorator(mutable, dirtyFlag) {
  'worklet';

  const listeners = new Map();
  let value = mutable.value;
  let isDirty = false;
  Object.defineProperties(mutable, {
    value: {
      get() {
        return value;
      },
      set(newValue) {
        valueSetter(mutable, newValue);
      },
      enumerable: true,
      configurable: true
    },
    get: {
      value() {
        return mutable.value;
      },
      configurable: false,
      enumerable: false
    },
    set: {
      value(newValue) {
        if (typeof newValue === 'function' && !newValue.__isAnimationDefinition) {
          mutable.value = newValue(mutable.value);
        } else {
          mutable.value = newValue;
        }
      },
      configurable: false,
      enumerable: false
    },
    _value: {
      get() {
        return value;
      },
      set(newValue) {
        if (!isDirty) {
          this.setDirty(true);
        }
        value = newValue;
        listeners.forEach(listener => {
          listener(newValue);
        });
      }
    },
    modify: {
      value: (modifier, forceUpdate = true) => {
        valueSetter(mutable, modifier !== undefined ? modifier(value) : value, forceUpdate);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    addListener: {
      value: (id, listener) => {
        listeners.set(id, listener);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeListener: {
      value: id => {
        listeners.delete(id);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    setDirty: {
      value: dirty => {
        dirtyFlag?.setBlocking(dirty);
        isDirty = dirty;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _animation: {
      value: null,
      writable: true,
      enumerable: true,
      configurable: true
    },
    _isReanimatedSharedValue: {
      value: true,
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
  return mutable;
}
//# sourceMappingURL=mutablesCommon.js.map