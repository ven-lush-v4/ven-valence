import type { WorkletFunction } from 'react-native-worklets';
import type { SharedValue } from '../commonTypes';
import type { DependencyList } from './commonTypes';
export interface DerivedValue<Value = unknown> extends Readonly<Omit<SharedValue<Value>, 'set'>> {
    /**
     * @deprecated Derived values are readonly, don't use this method. It's here
     *   only to prevent breaking changes in TypeScript types. It will be removed
     *   in the future.
     */
    set: SharedValue<Value>['set'];
}
export declare function useDerivedValueBase<Value>(updater: WorkletFunction<[], Value>, dependencies: DependencyList, inputs: unknown[]): DerivedValue<Value>;
//# sourceMappingURL=useDerivedValueCommon.d.ts.map