'use strict';

import { findHostInstance } from './platform-specific/findHostInstance';
function getNodeFromPublicInstanceFallback(publicInstance) {
  return publicInstance?.__internalInstanceHandle?.stateNode?.node;
}
function resolveGetNodeFromPublicInstance() {
  try {
    const ReactFabricPublicInstance =
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    require('react-native/Libraries/ReactNative/ReactFabricPublicInstance/ReactFabricPublicInstance');
    return ReactFabricPublicInstance?.getNodeFromPublicInstance ?? ReactFabricPublicInstance?.default?.getNodeFromPublicInstance ?? getNodeFromPublicInstanceFallback;
  } catch (_e) {
    return getNodeFromPublicInstanceFallback;
  }
}
const getNodeFromPublicInstance = resolveGetNodeFromPublicInstance();
function resolvePublicInstance(ref, hostInstance) {
  if (hostInstance?.__internalInstanceHandle) {
    return hostInstance;
  }
  if (ref?.__internalInstanceHandle) {
    return ref;
  }
  const nativeScrollRef = ref.getNativeScrollRef?.();
  if (nativeScrollRef) {
    return nativeScrollRef;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (ref._reactInternals) {
    return findHostInstance(ref);
  }
  throw new Error(`[Reanimated] Failed to find host instance for a ref.`);
}
export function getShadowNodeWrapperFromRef(ref, hostInstance) {
  const publicInstance = resolvePublicInstance(ref, hostInstance);
  const shadowNodeWrapper = getNodeFromPublicInstance(publicInstance);
  if (!shadowNodeWrapper) {
    throw new Error(`[Reanimated] Failed to find shadow node for a ref.`);
  }
  return shadowNodeWrapper;
}
//# sourceMappingURL=fabricUtils.native.js.map