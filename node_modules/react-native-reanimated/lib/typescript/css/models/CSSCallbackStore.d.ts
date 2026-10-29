type CSSCallbackMap<Prop extends string, Payload> = Partial<Record<Prop, ((payload: Payload) => void) | undefined>>;
/**
 * Holds the user's CSS callbacks and tracks which of them are present.
 *
 * Callbacks are read from a mutable slot at fire time, so a callback replaced
 * by a re-render can never fire, and re-created inline arrow functions cost
 * nothing. Subscription is driven by presence rather than identity, so
 * subclasses are only notified when a callback appears or disappears.
 */
export default abstract class CSSCallbackStore<Prop extends string, Payload> {
    private callbacks;
    private readonly present;
    private readonly props;
    constructor(props: readonly Prop[]);
    sync(callbacks: CSSCallbackMap<Prop, Payload>): void;
    detach(): void;
    protected invoke(prop: Prop, payload: Payload): void;
    /** Called only when the set changed, never when a callback is replaced. */
    protected abstract onPresenceChanged(present: ReadonlySet<Prop>): void;
}
export {};
//# sourceMappingURL=CSSCallbackStore.d.ts.map