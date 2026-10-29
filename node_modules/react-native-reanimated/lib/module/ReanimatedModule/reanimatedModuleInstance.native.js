'use strict';

import { IS_JEST } from "../common/index.js";
import { createJSReanimatedModule } from "./js-reanimated/index.js";
import { createNativeReanimatedModule } from "./NativeReanimated.js";
export const ReanimatedModule = IS_JEST ? createJSReanimatedModule() : createNativeReanimatedModule();
//# sourceMappingURL=reanimatedModuleInstance.native.js.map