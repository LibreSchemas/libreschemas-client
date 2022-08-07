"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFlipper;

var _nonSecure = require("nanoid/non-secure");

var React = _interopRequireWildcard(require("react"));

var _useDevToolsBase = _interopRequireDefault(require("./useDevToolsBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let FlipperModule;

try {
  FlipperModule = require('react-native-flipper');
} catch (e) {// Do nothing
}

function useFlipper(ref) {
  if (FlipperModule == null) {
    throw new Error("Please install the 'react-native-flipper' package in your project to use Flipper integration for React Navigation.");
  }

  const {
    addPlugin
  } = FlipperModule;
  const connectionRef = React.useRef();
  const {
    resetRoot
  } = (0, _useDevToolsBase.default)(ref, result => {
    const connection = connectionRef.current;

    if (!connection) {
      return;
    }

    switch (result.type) {
      case 'init':
        connection.send('init', {
          id: (0, _nonSecure.nanoid)(),
          state: result.state
        });
        break;

      case 'action':
        connection.send('action', {
          id: (0, _nonSecure.nanoid)(),
          action: result.action,
          state: result.state,
          stack: result.stack
        });
        break;
    }
  });
  React.useEffect(() => {
    addPlugin({
      getId() {
        return 'react-navigation';
      },

      async onConnect(connection) {
        connectionRef.current = connection;

        const on = (event, listener) => {
          connection.receive(event, (params, responder) => {
            try {
              const result = listener(params); // Return null instead of undefined, otherwise flipper doesn't respond

              responder.success(result !== null && result !== void 0 ? result : null);
            } catch (e) {
              responder.error(e);
            }
          });
        };

        on('navigation.invoke', _ref => {
          var _ref$current;

          let {
            method,
            args = []
          } = _ref;

          switch (method) {
            case 'resetRoot':
              return resetRoot(args[0]);

            default:
              // @ts-expect-error: we want to call arbitrary methods here
              return (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current[method](...args);
          }
        });
        on('linking.invoke', _ref2 => {
          var _global$REACT_NAVIGAT, _global$REACT_NAVIGAT2, _args$;

          let {
            method,
            args = []
          } = _ref2;
          const linking = ref.current ? // @ts-ignore: this might not exist
          (_global$REACT_NAVIGAT = global.REACT_NAVIGATION_DEVTOOLS) === null || _global$REACT_NAVIGAT === void 0 ? void 0 : (_global$REACT_NAVIGAT2 = _global$REACT_NAVIGAT.get(ref.current)) === null || _global$REACT_NAVIGAT2 === void 0 ? void 0 : _global$REACT_NAVIGAT2.linking : null;

          switch (method) {
            case 'getStateFromPath':
            case 'getPathFromState':
            case 'getActionFromState':
              return linking === null || linking === void 0 ? void 0 : linking[method](args[0], (_args$ = args[1]) !== null && _args$ !== void 0 && _args$.trim() ? // eslint-disable-next-line no-eval
              eval(`(function() { return ${args[1]}; }())`) : linking.config);

            default:
              return linking === null || linking === void 0 ? void 0 : linking[method](...args);
          }
        });
      },

      onDisconnect() {
        connectionRef.current = undefined;
      },

      runInBackground() {
        return false;
      }

    });
  }, [addPlugin, ref, resetRoot]);
}
//# sourceMappingURL=useFlipper.js.map