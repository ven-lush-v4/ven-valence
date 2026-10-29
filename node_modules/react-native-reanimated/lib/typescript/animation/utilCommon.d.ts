import type { AnimatableValue, AnimationObject } from '../commonTypes';
import { ReduceMotion } from '../commonTypes';
import type { StyleLayoutAnimation } from './commonTypes';
/**
 * This variable has to be an object, because it can't be changed for the
 * worklets if it's a primitive value. We also have to bind it to a separate
 * object to prevent from freezing it in development.
 */
export declare const IN_STYLE_UPDATER: {
    current: boolean;
};
export declare function isValidLayoutAnimationProp(prop: string): boolean;
export declare function initialUpdaterRun<T>(updater: () => T): T;
interface RecognizedPrefixSuffix {
    prefix?: string;
    suffix?: string;
    strippedValue: number;
}
export declare function recognizePrefixSuffix(value: string | number): RecognizedPrefixSuffix;
export declare function getReduceMotionFromConfig(config?: ReduceMotion): boolean;
/**
 * Returns the value that should be assigned to `animation.reduceMotion` for a
 * given config. If the config is not defined, `undefined` is returned.
 */
export declare function getReduceMotionForAnimation(config?: ReduceMotion): boolean | undefined;
export declare function decorateAnimation<T extends AnimationObject | StyleLayoutAnimation>(animation: T): void;
export type AnimationToDecoration<T extends AnimationObject | StyleLayoutAnimation, U extends AnimationObject | StyleLayoutAnimation> = T extends StyleLayoutAnimation ? Record<string, unknown> : U | (() => U) | AnimatableValue;
export {};
//# sourceMappingURL=utilCommon.d.ts.map