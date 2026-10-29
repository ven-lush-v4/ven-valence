'use strict';

import { useEffect, useRef } from 'react';
import { initialUpdaterRun } from "../animation/index.js";
import { makeMutable, startMapper, stopMapper } from "../core.js";
export function useDerivedValueBase(updater, dependencies, inputs) {
  const initRef = useRef(null);

  // build dependencies
  if (dependencies === undefined) {
    dependencies = [...inputs, updater.__workletHash];
  } else {
    dependencies = [...dependencies, updater.__workletHash];
  }
  if (initRef.current === null) {
    initRef.current = makeMutable(initialUpdaterRun(updater));
  }
  const sharedValue = initRef.current;
  useEffect(() => {
    const fun = () => {
      'worklet';

      sharedValue.value = updater();
    };
    const mapperId = startMapper(fun, inputs, [sharedValue]);
    return () => {
      stopMapper(mapperId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  return sharedValue;
}
//# sourceMappingURL=useDerivedValueCommon.js.map