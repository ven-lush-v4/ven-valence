import type { ReanimatedHTMLElement } from '../../../ReanimatedModule/js-reanimated';
import { CSSCallbackStore } from '../../models';
export declare class CSSCallbackListeners<Prop extends string, Payload> extends CSSCallbackStore<Prop, Payload> {
    private readonly element;
    private readonly eventNameByProp;
    private readonly buildPayload;
    private readonly attachedListeners;
    constructor(element: ReanimatedHTMLElement, eventNameByProp: Record<Prop, string>, buildPayload: (event: Event) => Payload);
    protected onPresenceChanged(present: ReadonlySet<Prop>): void;
    private createListener;
}
//# sourceMappingURL=CSSCallbackListeners.d.ts.map