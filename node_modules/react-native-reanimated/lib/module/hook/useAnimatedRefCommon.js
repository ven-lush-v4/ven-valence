'use strict';

import { useRef } from 'react';
import { findNodeHandle } from '../platformFunctions/findNodeHandle';
export function useAnimatedRefBase(getWrapper) {
  const observers = useRef(new Map()).current;
  const wrapperRef = useRef(null);
  const resultRef = useRef(null);
  if (!resultRef.current) {
    const fun = ref => {
      if (ref) {
        wrapperRef.current = getWrapper(ref);

        // We have to unwrap the tag from the shadow node wrapper.
        // @ts-expect-error this can't be typed well.
        fun.getTag = () => ref.getScrollableNode?.() || findNodeHandle(ref);
        fun.current = ref;
        if (observers.size) {
          const currentTag = fun?.getTag?.() ?? null;
          observers.forEach((cleanup, observer) => {
            // Perform the cleanup before calling the observer again.
            // This ensures that all events that were set up in the observer
            // are cleaned up before the observer sets up new events during
            // the next call.
            cleanup?.();
            observers.set(observer, observer(currentTag));
          });
        }
      }
      return wrapperRef.current;
    };
    fun.observe = observer => {
      // Call observer immediately to get the initial value
      const cleanup = observer(fun?.getTag?.() ?? null);
      observers.set(observer, cleanup);
      return () => {
        observers.get(observer)?.();
        observers.delete(observer);
      };
    };
    fun.current = null;
    resultRef.current = fun;
  }
  return resultRef.current;
}
//# sourceMappingURL=useAnimatedRefCommon.js.map