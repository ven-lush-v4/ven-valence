'use strict';

import { logger } from "../common/index.js";
import { useDerivedValueBase } from "./useDerivedValueCommon.js";

/**
 * Lets you create new shared values based on existing ones while keeping them
 * reactive.
 *
 * @param updater - A function called whenever at least one of the shared values
 *   or state used in the function body changes.
 * @param dependencies - An optional array of dependencies. Only relevant when
 *   using Reanimated without the Babel plugin on the Web.
 * @returns A new readonly shared value based on a value returned from the
 *   updater function
 * @see https://docs.swmansion.com/react-native-reanimated/docs/core/useDerivedValue
 */
// @ts-expect-error This overload is required by our API.

export function useDerivedValue(updater, _dependencies) {
  if (__DEV__ && _dependencies !== undefined) {
    logger.warn('dependencies should only be used in web implementation.');
  }
  const inputs = Object.values(updater.__closure ?? {});
  return useDerivedValueBase(updater, undefined, inputs);
}
//# sourceMappingURL=useDerivedValue.native.js.map