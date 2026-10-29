import type { DependencyList } from './commonTypes';
import type { EventHandlerInternal, EventHandlerProcessed } from './useEvent';
export type ComposedHandlerProcessed<Event extends object, Context extends Record<string, unknown> = Record<string, unknown>> = EventHandlerProcessed<Event, Context>;
type ComposedHandlerInternal<Event extends object> = EventHandlerInternal<Event>;
export declare function useComposedEventHandlerBase<Event extends object, Context extends Record<string, unknown>>(handlers: (EventHandlerProcessed<Event, Context> | null)[], dependencies: DependencyList): ComposedHandlerInternal<Event>;
export {};
//# sourceMappingURL=useComposedEventHandlerCommon.d.ts.map