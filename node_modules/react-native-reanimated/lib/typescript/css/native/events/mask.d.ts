import type { CSSAnimationCallbackProp, CSSTransitionCallbackProp } from '../../types';
export declare const ANIMATION_CALLBACK_PROP_BY_EVENT_TYPE: {
    readonly animationStart: "onCSSAnimationStart";
    readonly animationEnd: "onCSSAnimationEnd";
    readonly animationIteration: "onCSSAnimationIteration";
    readonly animationCancel: "onCSSAnimationCancel";
};
export declare const TRANSITION_CALLBACK_PROP_BY_EVENT_TYPE: {
    readonly transitionRun: "onCSSTransitionRun";
    readonly transitionStart: "onCSSTransitionStart";
    readonly transitionEnd: "onCSSTransitionEnd";
    readonly transitionCancel: "onCSSTransitionCancel";
};
export declare function getAnimationEventMaskFromProps(props: Iterable<CSSAnimationCallbackProp>): number;
export declare function getTransitionEventMaskFromProps(props: Iterable<CSSTransitionCallbackProp>): number;
//# sourceMappingURL=mask.d.ts.map