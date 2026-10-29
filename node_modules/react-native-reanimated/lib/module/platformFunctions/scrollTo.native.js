'use strict';

import { IS_JEST, logger } from "../common/index.js";
import { dispatchCommand } from './dispatchCommand';
/**
 * Lets you synchronously scroll to a given position of a `ScrollView`.
 *
 * @param animatedRef - An [animated
 *   ref](https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedRef)
 *   attached to an `Animated.ScrollView` component.
 * @param x - The x position you want to scroll to.
 * @param y - The y position you want to scroll to.
 * @param animated - Whether the scrolling should be smooth or instant.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/scroll/scrollTo
 */
export let scrollTo;
function scrollToNative(animatedRef, x, y, animated) {
  'worklet';

  dispatchCommand(animatedRef, 'scrollTo', [x, y, animated]);
}
function scrollToJest() {
  logger.warn('scrollTo() is not supported with Jest.');
}
if (IS_JEST) {
  scrollTo = scrollToJest;
} else {
  // Those assertions are actually correct since on Native platforms `AnimatedRef` is
  // mapped as a different function in `serializableMappingCache` and
  // TypeScript is not able to infer that.
  scrollTo = scrollToNative;
}
//# sourceMappingURL=scrollTo.native.js.map