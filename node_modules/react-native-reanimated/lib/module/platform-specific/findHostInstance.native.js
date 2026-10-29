/* eslint-disable camelcase */
'use strict';

function findHostInstanceFastPath(maybeNativeRef) {
  if (!maybeNativeRef) {
    return undefined;
  }
  if (maybeNativeRef.__internalInstanceHandle && maybeNativeRef.__nativeTag && (
  // ReactFabricHostComponent (e.g. react-native-macos) exposes `_viewConfig`;
  // ReactNativeElement uses `__viewConfig`.
  maybeNativeRef.__viewConfig || maybeNativeRef._viewConfig)) {
    return maybeNativeRef;
  }
  // That means it’s a ref to a non-native component, and it’s necessary
  // to call `findHostInstance_DEPRECATED` on them.
  return undefined;
}
function findHostInstanceFromScrollableRef(maybeScrollableRef) {
  if (!maybeScrollableRef) {
    return undefined;
  }
  const nativeScrollRef = maybeScrollableRef.getNativeScrollRef?.();
  if (nativeScrollRef) {
    const hostInstance = findHostInstanceFastPath(nativeScrollRef);
    if (hostInstance !== undefined) {
      return hostInstance;
    }
  }
  const scrollableNode = maybeScrollableRef.getScrollableNode?.();
  if (!scrollableNode || typeof scrollableNode === 'number') {
    return undefined;
  }
  return findHostInstanceFastPath(scrollableNode);
}
function resolveFindHostInstance_DEPRECATED() {
  if (findHostInstance_DEPRECATED !== undefined) {
    return;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
    const ReactFabric = require('react-native/Libraries/Renderer/shims/ReactFabric');
    // Since RN 0.77 ReactFabric exports findHostInstance_DEPRECATED in default object so we're trying to
    // access it first, then fallback on named export
    findHostInstance_DEPRECATED = ReactFabric?.default?.findHostInstance_DEPRECATED ?? ReactFabric?.findHostInstance_DEPRECATED;
  } catch (_e) {
    throw new Error('[Reanimated] Failed to resolve findHostInstance_DEPRECATED');
  }
}
let findHostInstance_DEPRECATED;
export function findHostInstance(ref) {
  const componentRef = ref._componentRef;

  // Fast path for native refs
  const hostInstance = findHostInstanceFastPath(componentRef);
  if (hostInstance !== undefined) {
    return hostInstance;
  }
  const scrollableHostInstance = findHostInstanceFromScrollableRef(componentRef);
  if (scrollableHostInstance !== undefined) {
    return scrollableHostInstance;
  }
  resolveFindHostInstance_DEPRECATED();
  /*
    The Fabric implementation of `findHostInstance_DEPRECATED` requires a React ref as an argument
    rather than a native ref. Prefer the resolved component ref when available so components can
    forward their ref to the host view that should be animated. Components that expose an animatable
    ref via `getAnimatableRef` already have it resolved into `_componentRef`.
  */
  return findHostInstance_DEPRECATED(componentRef ?? ref);
}
//# sourceMappingURL=findHostInstance.native.js.map