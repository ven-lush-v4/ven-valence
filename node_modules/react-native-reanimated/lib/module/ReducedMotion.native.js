'use strict';

import { createReducedMotionManager } from "./ReducedMotionCommon.js";
export function isReducedMotionEnabledInSystem() {
  return !!global._REANIMATED_IS_REDUCED_MOTION;
}
export const ReducedMotionManager = createReducedMotionManager(isReducedMotionEnabledInSystem());
//# sourceMappingURL=ReducedMotion.native.js.map