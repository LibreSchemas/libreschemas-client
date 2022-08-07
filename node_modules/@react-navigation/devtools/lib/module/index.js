const noop = () => {};

export let useReduxDevToolsExtension;
export let useFlipper;

if (process.env.NODE_ENV !== 'production') {
  useReduxDevToolsExtension = require('./useReduxDevToolsExtension').default;
  useFlipper = require('./useFlipper').default;
} else {
  useReduxDevToolsExtension = noop;
  useFlipper = noop;
}
//# sourceMappingURL=index.js.map