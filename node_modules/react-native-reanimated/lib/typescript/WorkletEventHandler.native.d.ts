import type { IWorkletEventHandler, ReanimatedEvent } from './hook/commonTypes';
export declare class WorkletEventHandler<Event extends object> implements IWorkletEventHandler<Event> {
    #private;
    eventNames: string[];
    worklet: (event: ReanimatedEvent<Event>) => void;
    constructor(worklet: (event: ReanimatedEvent<Event>) => void, eventNames: string[]);
    updateEventHandler(newWorklet: (event: ReanimatedEvent<Event>) => void, newEvents: string[]): void;
    registerForEvents(viewTag: number, fallbackEventName?: string): void;
    unregisterFromEvents(viewTag: number): void;
}
//# sourceMappingURL=WorkletEventHandler.native.d.ts.map