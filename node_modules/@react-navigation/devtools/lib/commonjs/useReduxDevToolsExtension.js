"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useReduxDevToolsExtension;

var React = _interopRequireWildcard(require("react"));

var _useDevToolsBase = _interopRequireDefault(require("./useDevToolsBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useReduxDevToolsExtension(ref) {
  const devToolsRef = React.useRef();

  if (devToolsRef.current === undefined && typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
    devToolsRef.current = __REDUX_DEVTOOLS_EXTENSION__.connect({
      name: '@react-navigation/devtools'
    });
  }

  const {
    resetRoot
  } = (0, _useDevToolsBase.default)(ref, result => {
    const devTools = devToolsRef.current;

    if (!devTools) {
      return;
    }

    switch (result.type) {
      case 'init':
        devTools.init(result.state);
        break;

      case 'action':
        devTools.send(result.action, result.state);
        break;
    }
  });
  React.useEffect(() => {
    var _devToolsRef$current;

    return (_devToolsRef$current = devToolsRef.current) === null || _devToolsRef$current === void 0 ? void 0 : _devToolsRef$current.subscribe(message => {
      if (message.type === 'DISPATCH' && message.state) {
        const state = JSON.parse(message.state);
        resetRoot(state);
      }
    });
  }, [resetRoot]);
}
//# sourceMappingURL=useReduxDevToolsExtension.js.map