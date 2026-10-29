'use strict';

import { useEffect, useRef } from 'react';
import { makeShareable } from 'react-native-worklets';
import { logger } from "../common/index.js";
import { areWorkletHandlersEqual, ensureWorkletHandlers } from "./useHandlerCommon.js";
/**
 * Lets you find out whether the event handler dependencies have changed.
 *
 * @param handlers - An object of event handlers.
 * @param dependencies - An optional array of dependencies. Only relevant when
 *   using Reanimated without the Babel plugin on the Web.
 * @returns An object containing a boolean indicating whether the dependencies
 *   have changed.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/advanced/useHandler
 */
export function useHandler(handlers, _dependencies) {
  'use no memo';

  if (__DEV__ && _dependencies !== undefined) {
    logger.warn('dependencies should only be used in web implementation.');
  }
  const stateRef = useRef(null);
  if (stateRef.current === null) {
    stateRef.current = {
      context: undefined,
      prevHandlers: undefined
    };
  }
  const state = stateRef.current;
  if (__DEV__) {
    ensureWorkletHandlers(handlers);
  }
  const doDependenciesDiffer = !areWorkletHandlersEqual(handlers, state.prevHandlers);

  // Write after commit to avoid corruption from interrupted renders (in case of concurrent mode).
  useEffect(() => {
    state.prevHandlers = handlers;
  });
  return {
    get context() {
      if (state.context === undefined) {
        state.context = makeShareable({});
      }
      return state.context;
    },
    doDependenciesDiffer
  };
}
//# sourceMappingURL=useHandler.native.js.map