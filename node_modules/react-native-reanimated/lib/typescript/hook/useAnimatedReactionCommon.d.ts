import type { WorkletFunction } from 'react-native-worklets';
import type { DependencyList } from './commonTypes';
export declare function useAnimatedReactionBase<PreparedResult>(prepare: WorkletFunction<[], PreparedResult>, react: WorkletFunction<[
    prepare: PreparedResult,
    previous: PreparedResult | null
], void>, dependencies: DependencyList, inputs: unknown[]): void;
//# sourceMappingURL=useAnimatedReactionCommon.d.ts.map