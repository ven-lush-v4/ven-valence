'use strict';

import { RuntimeKind } from 'react-native-worklets';
import { IS_JEST, logger } from "../common/index.js";
export let setGestureState;
function setGestureStateNative(handlerTag, newState) {
  'worklet';

  if (globalThis.__RUNTIME_KIND === RuntimeKind.ReactNative) {
    logger.warn('You can not use setGestureState in non-worklet function.');
    return;
  }
  global._setGestureState(handlerTag, newState);
}
function setGestureStateJest() {
  logger.warn('setGestureState() cannot be used with Jest.');
}
if (IS_JEST) {
  setGestureState = setGestureStateJest;
} else {
  setGestureState = setGestureStateNative;
}
//# sourceMappingURL=setGestureState.native.js.map