"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReduxDevToolsExtension = exports.useFlipper = void 0;

const noop = () => {};

let useReduxDevToolsExtension;
exports.useReduxDevToolsExtension = useReduxDevToolsExtension;
let useFlipper;
exports.useFlipper = useFlipper;

if (process.env.NODE_ENV !== 'production') {
  exports.useReduxDevToolsExtension = useReduxDevToolsExtension = require('./useReduxDevToolsExtension').default;
  exports.useFlipper = useFlipper = require('./useFlipper').default;
} else {
  exports.useReduxDevToolsExtension = useReduxDevToolsExtension = noop;
  exports.useFlipper = useFlipper = noop;
}
//# sourceMappingURL=index.js.map