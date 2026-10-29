import type { CSSAnimationCallbacks, CSSTransitionCallbacks } from '../../types';
import type { CSSEventSubscriber, NativeCSSEvent } from '../events';
export default class CSSCallbacksManager implements CSSEventSubscriber {
    private readonly viewTag;
    private readonly animationCallbacks;
    private readonly transitionCallbacks;
    constructor(viewTag: number);
    getAnimationEventMask(): number;
    getTransitionEventMask(): number;
    syncAnimationCallbacks(callbacks: CSSAnimationCallbacks | null): void;
    syncTransitionCallbacks(callbacks: CSSTransitionCallbacks | null): void;
    detach(): void;
    /**
     * Unsubscribes without dropping the callbacks, so a cancel already emitted
     * for the unmounting view still reaches the user.
     */
    retire(): void;
    handleCSSEvent(event: NativeCSSEvent): void;
    private updateRegistration;
}
//# sourceMappingURL=CSSCallbacksManager.d.ts.map