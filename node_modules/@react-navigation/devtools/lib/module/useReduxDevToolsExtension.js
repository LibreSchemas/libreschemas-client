import * as React from 'react';
import useDevToolsBase from './useDevToolsBase';
export default function useReduxDevToolsExtension(ref) {
  const devToolsRef = React.useRef();

  if (devToolsRef.current === undefined && typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
    devToolsRef.current = __REDUX_DEVTOOLS_EXTENSION__.connect({
      name: '@react-navigation/devtools'
    });
  }

  const {
    resetRoot
  } = useDevToolsBase(ref, result => {
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