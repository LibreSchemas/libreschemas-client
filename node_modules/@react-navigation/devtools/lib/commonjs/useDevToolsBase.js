"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDevToolsBase;

var _deepEqual = _interopRequireDefault(require("deep-equal"));

var React = _interopRequireWildcard(require("react"));

var _parseErrorStack = _interopRequireDefault(require("./parseErrorStack"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDevToolsBase(ref, callback) {
  const lastStateRef = React.useRef();
  const lastActionRef = React.useRef();
  const callbackRef = React.useRef(callback);
  const lastResetRef = React.useRef(undefined);
  React.useEffect(() => {
    callbackRef.current = callback;
  });

  const symbolicate = async stack => {
    var _frames$, _frames$$file;

    if (stack == null) {
      return undefined;
    }

    const frames = (0, _parseErrorStack.default)(stack).slice(2).filter(frame => frame.file !== '[native code]');
    const urlMatch = (_frames$ = frames[0]) === null || _frames$ === void 0 ? void 0 : (_frames$$file = _frames$.file) === null || _frames$$file === void 0 ? void 0 : _frames$$file.match(/^https?:\/\/.+(:\d+)?\//);

    if (!urlMatch) {
      return stack;
    }

    try {
      const result = await fetch(`${urlMatch[0]}symbolicate`, {
        method: 'POST',
        body: JSON.stringify({
          stack: frames
        })
      }).then(res => res.json());
      return result.stack.filter(it => !it.collapse).map(_ref => {
        let {
          methodName,
          file,
          lineNumber,
          column
        } = _ref;
        return `${methodName}@${file}:${lineNumber}:${column}`;
      }).join('\n');
    } catch (err) {
      return stack;
    }
  };

  const pendingPromiseRef = React.useRef(Promise.resolve());
  const send = React.useCallback(data => {
    // We need to make sure that our callbacks executed in the same order
    // So we add check if the last promise is settled before sending the next one
    pendingPromiseRef.current = pendingPromiseRef.current.catch(() => {// Ignore any errors from the last promise
    }).then(async () => {
      if (data.stack) {
        let stack;

        try {
          stack = await symbolicate(data.stack);
        } catch (err) {// Ignore errors from symbolicate
        }

        callbackRef.current({ ...data,
          stack
        });
      } else {
        callbackRef.current(data);
      }
    });
  }, []);
  React.useEffect(() => {
    let timer;
    let unsubscribeAction;
    let unsubscribeState;

    const initialize = async () => {
      if (!ref.current) {
        // If the navigation object isn't ready yet, wait for it
        await new Promise(resolve => {
          timer = setInterval(() => {
            if (ref.current) {
              resolve();
              clearTimeout(timer);
              const state = ref.current.getRootState();
              lastStateRef.current = state;
              callbackRef.current({
                type: 'init',
                state
              });
            }
          }, 100);
        });
      }

      const navigation = ref.current;
      unsubscribeAction = navigation.addListener('__unsafe_action__', e => {
        const action = e.data.action;

        if (e.data.noop) {
          // Even if the state didn't change, it's useful to show the action
          send({
            type: 'action',
            action,
            state: lastStateRef.current,
            stack: e.data.stack
          });
        } else {
          lastActionRef.current = e.data;
        }
      });
      unsubscribeState = navigation.addListener('state', e => {
        // Don't show the action in dev tools if the state is what we sent to reset earlier
        if (lastResetRef.current && (0, _deepEqual.default)(lastResetRef.current, e.data.state)) {
          lastStateRef.current = undefined;
          return;
        }

        const state = navigation.getRootState();
        const lastState = lastStateRef.current;
        const lastChange = lastActionRef.current;
        lastActionRef.current = undefined;
        lastStateRef.current = state; // If we don't have an action and the state didn't change, then it's probably extraneous

        if (lastChange === undefined && (0, _deepEqual.default)(state, lastState)) {
          return;
        }

        send({
          type: 'action',
          action: lastChange ? lastChange.action : {
            type: '@@UNKNOWN'
          },
          state,
          stack: lastChange === null || lastChange === void 0 ? void 0 : lastChange.stack
        });
      });
    };

    initialize();
    return () => {
      var _unsubscribeAction, _unsubscribeState;

      (_unsubscribeAction = unsubscribeAction) === null || _unsubscribeAction === void 0 ? void 0 : _unsubscribeAction();
      (_unsubscribeState = unsubscribeState) === null || _unsubscribeState === void 0 ? void 0 : _unsubscribeState();
      clearTimeout(timer);
    };
  }, [ref, send]);
  const resetRoot = React.useCallback(state => {
    if (ref.current) {
      lastResetRef.current = state;
      ref.current.resetRoot(state);
    }
  }, [ref]);
  return {
    resetRoot
  };
}
//# sourceMappingURL=useDevToolsBase.js.map