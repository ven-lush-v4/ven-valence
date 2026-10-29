'use strict';

import { makeMutable } from './mutables';
export function createReducedMotionManager(initialValue) {
  const manager = {
    jsValue: initialValue,
    uiValue: makeMutable(initialValue),
    setEnabled(value) {
      manager.jsValue = value;
      manager.uiValue.value = value;
    }
  };
  return manager;
}
//# sourceMappingURL=ReducedMotionCommon.js.map