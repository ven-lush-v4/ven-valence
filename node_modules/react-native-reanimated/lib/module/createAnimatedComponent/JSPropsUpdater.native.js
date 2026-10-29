'use strict';

import { scheduleOnUI } from 'react-native-worklets';
class JSPropsUpdaterNative {
  static _tagToComponentMapping = new Map();
  registerComponent(animatedComponent, jsProps) {
    const viewTag = animatedComponent.getComponentViewTag();
    JSPropsUpdaterNative._tagToComponentMapping.set(viewTag, animatedComponent);
    scheduleOnUI(() => {
      global._tagToJSPropNamesMapping[viewTag] = Object.fromEntries(jsProps.map(propName => [propName, true]));
    });
  }
  unregisterComponent(animatedComponent) {
    const viewTag = animatedComponent.getComponentViewTag();
    JSPropsUpdaterNative._tagToComponentMapping.delete(viewTag);
    scheduleOnUI(() => {
      delete global._tagToJSPropNamesMapping[viewTag];
    });
  }
  updateProps(operations) {
    operations.forEach(({
      tag,
      updates
    }) => {
      const component = JSPropsUpdaterNative._tagToComponentMapping.get(tag);
      component?.setNativeProps(updates);
    });
  }
}
const jsPropsUpdater = new JSPropsUpdaterNative();
export default jsPropsUpdater;
//# sourceMappingURL=JSPropsUpdater.native.js.map