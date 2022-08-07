import { nanoid } from 'nanoid/non-secure';
import * as React from 'react';
import useDevToolsBase from './useDevToolsBase';
let FlipperModule;

try {
  FlipperModule = require('react-native-flipper');
} catch (e) {// Do nothing
}

export default function useFlipper(ref) {
  if (FlipperModule == null) {
    throw new Error("Please install the 'react-native-flipper' package in your project to use Flipper integration for React Navigation.");
  }

  const {
    addPlugin
  } = FlipperModule;
  const connectionRef = React.useRef();
  const {
    resetRoot
  } = useDevToolsBase(ref, result => {
    const connection = connectionRef.current;

    if (!connection) {
      return;
    }

    switch (result.type) {
      case 'init':
        connection.send('init', {
          id: nanoid(),
          state: result.state
        });
        break;

      case 'action':
        connection.send('action', {
          id: nanoid(),
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