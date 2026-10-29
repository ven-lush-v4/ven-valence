'use strict';

import { createShareable, createSynchronizable, runOnUISync, scheduleOnUI, UIRuntimeId } from 'react-native-worklets';
import { getStaticFeatureFlag } from "./featureFlags/index.js";
import { checkInvalidReadDuringRender, checkInvalidWriteDuringRender, mutableHostDecorator } from "./mutablesCommon.js";
const USE_SYNCHRONIZABLE_FOR_MUTABLES = getStaticFeatureFlag('USE_SYNCHRONIZABLE_FOR_MUTABLES');
function mutableGuestDecorator(initial, mutable, dirtyFlag) {
  'worklet';

  let latest = initial;
  Object.defineProperties(mutable, {
    value: {
      get() {
        if (globalThis.__RUNTIME_KIND === 1) {
          checkInvalidReadDuringRender();
        }
        if (globalThis.__RUNTIME_KIND !== 1 || dirtyFlag === undefined) {
          latest = mutable.getSync();
        } else if (dirtyFlag.getBlocking()) {
          const uiValueGetter = svArg => runOnUISync(sv => {
            sv.setDirty?.(false);
            return sv.value;
          }, svArg);
          latest = uiValueGetter(mutable);
        }
        return latest;
      },
      set(newValue) {
        if (globalThis.__RUNTIME_KIND === 1) {
          checkInvalidWriteDuringRender();
          scheduleOnUI(() => {
            mutable.value = newValue;
          });
        } else {
          mutable.setAsync(newValue);
        }
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
        throw new Error('[Reanimated] Reading from `_value` directly is only possible on the UI runtime. Perhaps you wanted to access `value` instead?');
      },
      set(_newValue) {
        throw new Error('[Reanimated] Setting `_value` directly is only possible on the UI runtime. Perhaps you wanted to assign to `value` instead?');
      }
    },
    modify: {
      value: (modifier, forceUpdate = true) => {
        scheduleOnUI(() => {
          mutable.modify(modifier, forceUpdate);
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    addListener: {
      value: () => {
        throw new Error('[Reanimated] Adding listeners is only possible on the UI runtime.');
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeListener: {
      value: () => {
        throw new Error('[Reanimated] Removing listeners is only possible on the UI runtime.');
      },
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
export function makeMutable(initial) {
  const dirtyFlag = USE_SYNCHRONIZABLE_FOR_MUTABLES ? createSynchronizable(false) : undefined;
  const shareable = createShareable(UIRuntimeId, initial, {
    hostDecorator: shareableHost => {
      'worklet';

      return mutableHostDecorator(shareableHost, dirtyFlag);
    },
    guestDecorator: shareableGuest => {
      'worklet';

      return mutableGuestDecorator(initial, shareableGuest, dirtyFlag);
    }
  });
  return shareable;
}
//# sourceMappingURL=mutables.native.js.map