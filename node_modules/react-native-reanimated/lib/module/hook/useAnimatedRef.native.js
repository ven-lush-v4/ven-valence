'use strict';

import { useState } from 'react';
import { createSerializable, serializableMappingCache } from 'react-native-worklets';
import { getShadowNodeWrapperFromRef } from '../fabricUtils';
import { makeMutable } from '../mutables';
import { useAnimatedRefBase } from "./useAnimatedRefCommon.js";

/**
 * Lets you get a reference of a view that you can use inside a worklet.
 *
 * @returns An object with a `.current` property which contains an instance of
 *   the reference object.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedRef
 */
export function useAnimatedRef() {
  const [sharedWrapper] = useState(() => makeMutable(null));
  const resultRef = useAnimatedRefBase(ref => {
    const currentWrapper = getShadowNodeWrapperFromRef(ref);
    sharedWrapper.value = currentWrapper;
    return currentWrapper;
  });
  if (!serializableMappingCache.get(resultRef)) {
    const animatedRefSerializableHandle = createSerializable({
      __init: () => {
        'worklet';

        return () => sharedWrapper.value;
      }
    });
    serializableMappingCache.set(resultRef, animatedRefSerializableHandle);
  }
  return resultRef;
}
//# sourceMappingURL=useAnimatedRef.native.js.map