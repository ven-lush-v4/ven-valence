import type { WorkletFunction } from 'react-native-worklets';
import type { AnimatedStyle, AnimationObject, NestedObjectValues, SharedValue, StyleUpdaterContainer, Timestamp } from '../commonTypes';
import type { ViewDescriptorsSet } from '../ViewDescriptorsSet';
import type { Descriptor } from './commonTypes';
export interface AnimatedState {
    last: AnimatedStyle<any>;
    animations: AnimatedStyle<any>;
    isAnimationRunning: boolean;
    isAnimationCancelled: boolean;
}
export interface AnimatedUpdaterData {
    initial: {
        value: AnimatedStyle<any>;
        updater: () => AnimatedStyle<any>;
    };
    remoteState: AnimatedState;
    viewDescriptors: ViewDescriptorsSet;
    styleUpdaterContainer: StyleUpdaterContainer;
}
export declare function prepareAnimation(frameTimestamp: number, animatedProp: AnimatedStyle<any>, lastAnimation: AnimatedStyle<any>, lastValue: AnimatedStyle<any>): void;
export declare function runAnimations(animation: AnimatedStyle<any>, timestamp: Timestamp, key: number | string, result: AnimatedStyle<any>, animationsActive: SharedValue<boolean>, forceCopyAnimation?: boolean): boolean;
export declare function styleUpdater(viewDescriptors: SharedValue<Descriptor[]>, updater: WorkletFunction<[], AnimatedStyle<any>> | (() => AnimatedStyle<any>), state: AnimatedState, animationsActive: SharedValue<boolean>, isAnimatedProps?: boolean, forceUpdate?: boolean): void;
export declare function checkSharedValueUsage(prop: NestedObjectValues<AnimationObject>, currentKey?: string): void;
export declare function buildWorkletsHash<Args extends unknown[], ReturnValue>(worklets: Record<string, WorkletFunction<Args, ReturnValue>> | WorkletFunction<Args, ReturnValue>[]): string;
//# sourceMappingURL=useAnimatedStyleCommon.d.ts.map