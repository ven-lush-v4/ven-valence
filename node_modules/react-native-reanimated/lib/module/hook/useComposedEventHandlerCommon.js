'use strict';

import { WorkletEventHandler } from '../WorkletEventHandler';
import { useEvent } from "./useEvent.js";
import { useHandler } from './useHandler';
export function useComposedEventHandlerBase(handlers, dependencies) {
  // Record of handlers' worklets to calculate deps diffs. We use the record type to match the useHandler API requirements
  const workletsRecord = {};
  // Summed event names for registration
  const composedEventNames = new Set();
  // Map that holds worklets for specific handled events
  const workletsMap = {};
  handlers.filter(h => h !== null).forEach(handler => {
    // EventHandlerProcessed is the return type of useEvent and has to be force casted to EventHandlerInternal, because we need WorkletEventHandler object
    const {
      workletEventHandler
    } = handler;
    if (workletEventHandler instanceof WorkletEventHandler) {
      workletEventHandler.eventNames.forEach(eventName => {
        composedEventNames.add(eventName);
        if (workletsMap[eventName]) {
          workletsMap[eventName].push(workletEventHandler.worklet);
        } else {
          workletsMap[eventName] = [workletEventHandler.worklet];
        }
        const handlerName = eventName + `${workletsMap[eventName].length}`;
        workletsRecord[handlerName] = workletEventHandler.worklet;
      });
    }
  });
  const {
    doDependenciesDiffer
  } = useHandler(workletsRecord, dependencies);
  return useEvent(event => {
    'worklet';

    if (workletsMap[event.eventName]) {
      workletsMap[event.eventName].forEach(worklet => worklet(event));
    }
  }, Array.from(composedEventNames), doDependenciesDiffer);
}
//# sourceMappingURL=useComposedEventHandlerCommon.js.map