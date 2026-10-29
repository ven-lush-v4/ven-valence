'use strict';

import { logger } from "../common/index.js";
import { useAnimatedReactionBase } from "./useAnimatedReactionCommon.js";

/**
 * Lets you to respond to changes in a [shared
 * value](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#shared-value).
 * It's especially useful when comparing values previously stored in the shared
 * value with the current one.
 *
 * @param prepare - A function that should return a value to which you'd like to
 *   react.
 * @param react - A function that reacts to changes in the value returned by the
 *   `prepare` function.
 * @param dependencies - An optional array of dependencies. Only relevant when
 *   using Reanimated without the Babel plugin on the Web.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/advanced/useAnimatedReaction
 */
// @ts-expect-error This overload is required by our API.

export function useAnimatedReaction(prepare, react, _dependencies) {
  if (__DEV__ && _dependencies !== undefined) {
    logger.warn('dependencies should only be used in web implementation.');
  }
  const inputs = Object.values(prepare.__closure ?? {});
  useAnimatedReactionBase(prepare, react, undefined, inputs);
}
//# sourceMappingURL=useAnimatedReaction.native.js.map