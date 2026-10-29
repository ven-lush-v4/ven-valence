'use strict';

import { useEffect, useRef } from 'react';
import { makeShareable } from 'react-native-worklets';
import { initialUpdaterRun } from "../animation/index.js";
import { logger } from "../common/index.js";
import { startMapper, stopMapper } from "../core.js";
import { makeViewDescriptorsSet } from "../ViewDescriptorsSet.js";
import { buildWorkletsHash, checkSharedValueUsage, styleUpdater } from "./useAnimatedStyleCommon.js";
import { useSharedValue } from "./useSharedValue.js";
import { validateAnimatedStyles } from "./utils.js";

/**
 * Lets you create a styles object, similar to StyleSheet styles, which can be
 * animated using shared values.
 *
 * @param updater - A function returning an object with style properties you
 *   want to animate.
 * @param dependencies - An optional array of dependencies.
 * @returns An animated style object which has to be passed to the `style`
 *   property of an Animated component you want to animate.
 * @see https://docs.swmansion.com/react-native-reanimated/docs/core/useAnimatedStyle
 */
// @ts-expect-error Public type definition which strips internals.

export function useAnimatedStyle(updater, _dependencies, adapters, isAnimatedProps = false) {
  if (__DEV__ && _dependencies !== undefined && _dependencies !== null) {
    logger.warn('dependencies should only be used in web implementation.');
  }
  const animatedUpdaterData = useRef(null);
  const inputs = Object.values(updater.__closure ?? {});
  const adaptersArray = adapters ? Array.isArray(adapters) ? adapters : [adapters] : [];
  const adaptersHash = adapters ? buildWorkletsHash(adaptersArray) : null;
  const areAnimationsActive = useSharedValue(true);

  // build dependencies
  const dependencies = [...inputs, updater.__workletHash];
  if (adaptersHash) {
    dependencies.push(adaptersHash);
  }
  if (!animatedUpdaterData.current) {
    const initialStyle = initialUpdaterRun(updater);
    if (__DEV__) {
      validateAnimatedStyles(initialStyle);
    }
    animatedUpdaterData.current = {
      initial: {
        value: initialStyle,
        updater
      },
      remoteState: makeShareable({
        last: initialStyle,
        animations: {},
        isAnimationCancelled: false,
        isAnimationRunning: false
      }),
      viewDescriptors: makeViewDescriptorsSet(),
      styleUpdaterContainer: {
        current: undefined
      }
    };
  }
  const {
    initial,
    remoteState,
    viewDescriptors
  } = animatedUpdaterData.current;
  const shareableViewDescriptors = viewDescriptors.shareableViewDescriptors;
  dependencies.push(shareableViewDescriptors);
  useEffect(() => {
    let updaterFn = updater;
    if (adapters) {
      updaterFn = () => {
        'worklet';

        const newValues = updater();
        adaptersArray.forEach(adapter => {
          adapter(newValues);
        });
        return newValues;
      };
    }
    const fun = forceUpdate => {
      'worklet';

      styleUpdater(shareableViewDescriptors, updaterFn, remoteState, areAnimationsActive, isAnimatedProps, forceUpdate);
    };
    if (animatedUpdaterData.current) {
      animatedUpdaterData.current.styleUpdaterContainer.current = fun;
    }
    const mapperId = startMapper(fun, inputs);
    return () => {
      stopMapper(mapperId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  useEffect(() => {
    areAnimationsActive.value = true;
    return () => {
      areAnimationsActive.value = false;
    };
  }, [areAnimationsActive]);
  if (__DEV__) {
    checkSharedValueUsage(initial.value);
  }
  const animatedStyleHandle = useRef(null);
  if (!animatedStyleHandle.current) {
    const styleUpdaterContainer = animatedUpdaterData.current.styleUpdaterContainer;
    animatedStyleHandle.current = {
      viewDescriptors,
      initial,
      styleUpdaterContainer
    };
  }
  return animatedStyleHandle.current;
}
//# sourceMappingURL=useAnimatedStyle.native.js.map