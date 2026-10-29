import type { WorkletFunction } from 'react-native-worklets';
import type { UnknownRecord } from '../common';
import type { ReanimatedEvent } from './commonTypes';
interface GeneralHandler<TEvent extends object, TContext extends UnknownRecord> {
    (event: ReanimatedEvent<TEvent>, context: TContext): void;
}
export type GeneralHandlers<TEvent extends object, TContext extends UnknownRecord> = Record<string, GeneralHandler<TEvent, TContext> | undefined>;
export interface UseHandlerContext<TContext extends UnknownRecord> {
    context: TContext;
    doDependenciesDiffer: boolean;
}
export declare function ensureWorkletHandlers(handlers: UnknownRecord): void;
export declare function areWorkletHandlersEqual(next: Partial<Record<string, WorkletFunction>> | undefined, prev: Partial<Record<string, WorkletFunction>> | undefined): boolean;
export declare function areDependenciesEqual(next: Array<unknown> | undefined, prev: Array<unknown> | undefined): boolean;
export {};
//# sourceMappingURL=useHandlerCommon.d.ts.map