'use strict';

import './layoutReanimation/animationsManager';
import { runOnUISync, toggleSlowAnimationsOnUIRuntime } from 'react-native-worklets';
import { cssCallbacksRegistry, setCSSEventHandler } from "./css/native/index.js";
import { initSvgCssSupport } from "./css/svg/index.js";
import { getStaticFeatureFlag } from "./featureFlags/index.js";
export function initializeReanimatedModule(ReanimatedModule) {
  if (!ReanimatedModule) {
    throw new Error('[Reanimated] Tried to initialize Reanimated without a valid ReanimatedModule');
  }
  setCSSEventHandler(events => cssCallbacksRegistry.dispatch(events));
  if (getStaticFeatureFlag('EXPERIMENTAL_CSS_ANIMATIONS_FOR_SVG_COMPONENTS')) {
    initSvgCssSupport();
  }
}
globalThis.__toggleSlowAnimationsOnUIRuntime = () => toggleSlowAnimationsOnUIRuntime();
runOnUISync(() => {
  'worklet';

  global._tagToJSPropNamesMapping = {};
});
//# sourceMappingURL=initializers.native.js.map