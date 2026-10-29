export type CSSAnimationEventType = 'animationStart' | 'animationEnd' | 'animationIteration' | 'animationCancel';
export type CSSTransitionEventType = 'transitionRun' | 'transitionStart' | 'transitionEnd' | 'transitionCancel';
export type CSSEventType = CSSAnimationEventType | CSSTransitionEventType;
export type NativeCSSEvent = {
    tag: number;
    type: CSSEventType;
    /** Animation name for animation events, RN property name for transitions. */
    name: string;
    /** Already converted to seconds by the native side. */
    elapsedTime: number;
};
export type CSSEventHandler = (events: NativeCSSEvent[]) => void;
export interface CSSEventSubscriber {
    handleCSSEvent(event: NativeCSSEvent): void;
}
/**
 * Bit requested for each event type. The native side emits an event only when
 * its bit is set, so these values must stay in sync with the C++ ones.
 */
export declare const CSS_EVENT_MASK: {
    readonly animationStart: number;
    readonly animationEnd: number;
    readonly animationIteration: number;
    readonly animationCancel: number;
    readonly transitionRun: number;
    readonly transitionStart: number;
    readonly transitionEnd: number;
    readonly transitionCancel: number;
};
//# sourceMappingURL=types.d.ts.map