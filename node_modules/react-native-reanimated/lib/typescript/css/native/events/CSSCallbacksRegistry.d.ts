import type { CSSEventSubscriber, NativeCSSEvent } from './types';
/**
 * Routes CSS events emitted by the native side to the objects interested in a
 * given view. Nested animated components can share a view tag, so every tag
 * keeps a set of subscribers rather than a single one.
 *
 * A view that unmounts is retired instead of unregistered: it stops being a
 * subscriber, but still hears the batch after, because the engine emits its
 * cancel as it tears down and that batch arrives once the view is gone.
 */
declare class CSSCallbacksRegistry {
    private readonly subscribersByTag;
    private retiringByTag;
    register(viewTag: number, subscriber: CSSEventSubscriber): void;
    unregister(viewTag: number, subscriber: CSSEventSubscriber): void;
    /**
     * Unregistering now, rather than after the batch it still hears, is what lets
     * a view that mounts again stay subscribed by simply registering.
     */
    retire(viewTag: number, subscriber: CSSEventSubscriber): void;
    dispatch(events: NativeCSSEvent[]): void;
    clear(): void;
}
declare const cssCallbacksRegistry: CSSCallbacksRegistry;
export default cssCallbacksRegistry;
//# sourceMappingURL=CSSCallbacksRegistry.d.ts.map