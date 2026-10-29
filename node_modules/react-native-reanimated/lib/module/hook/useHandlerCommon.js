'use strict';

import { isWorkletFunction } from 'react-native-worklets';
export function ensureWorkletHandlers(handlers) {
  const nonWorkletNames = Object.entries(handlers).reduce((acc, [name, handler]) => {
    if (!isWorkletFunction(handler)) acc.push(name);
    return acc;
  }, []);
  if (nonWorkletNames.length > 0) {
    throw new Error(`[Reanimated] Passed handlers that are not worklets. Only worklet functions are allowed. Handlers "${nonWorkletNames.join(', ')}" are not worklets.`);
  }
}
const objectIs = typeof Object.is === 'function' ? Object.is : (x, y) => x === y && (x !== 0 || 1 / x === 1 / y) || Number.isNaN(x) && Number.isNaN(y);
function areWorkletClosuresEqual(next, prev) {
  const nextKeys = Object.keys(next);
  const prevKeys = Object.keys(prev);
  return prevKeys.length === nextKeys.length && prevKeys.every(key => key in next && objectIs(next[key], prev[key]));
}
function areWorkletsEqual(next, prev) {
  if (objectIs(next, prev)) {
    return true;
  }
  return next.__workletHash === prev.__workletHash && areWorkletClosuresEqual(next.__closure, prev.__closure);
}
export function areWorkletHandlersEqual(next, prev) {
  if (!next || !prev) {
    return false;
  }
  const nextKeys = Object.keys(next);
  const prevKeys = Object.keys(prev);
  if (nextKeys.length !== prevKeys.length) {
    return false;
  }
  return nextKeys.every(key => {
    const nextValue = next[key];
    const prevValue = prev[key];
    if (!nextValue || !prevValue) {
      return false;
    }
    return areWorkletsEqual(nextValue, prevValue);
  });
}
export function areDependenciesEqual(next, prev) {
  if (!next || !prev || next.length !== prev.length) {
    return false;
  }
  return next.every((value, index) => objectIs(value, prev[index]));
}
//# sourceMappingURL=useHandlerCommon.js.map