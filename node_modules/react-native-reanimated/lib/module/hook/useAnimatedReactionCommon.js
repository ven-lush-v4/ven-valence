'use strict';

import { useEffect } from 'react';
import { startMapper, stopMapper } from "../core.js";
import { useSharedValue } from "./useSharedValue.js";
export function useAnimatedReactionBase(prepare, react, dependencies, inputs) {
  const previous = useSharedValue(null);
  if (dependencies === undefined) {
    dependencies = [...Object.values(prepare.__closure ?? {}), ...Object.values(react.__closure ?? {}), prepare.__workletHash, react.__workletHash];
  } else {
    dependencies = [...dependencies, prepare.__workletHash, react.__workletHash];
  }
  useEffect(() => {
    const fun = () => {
      'worklet';

      const input = prepare();
      react(input, previous.value);
      previous.value = input;
    };
    const mapperId = startMapper(fun, inputs);
    return () => {
      stopMapper(mapperId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
//# sourceMappingURL=useAnimatedReactionCommon.js.map