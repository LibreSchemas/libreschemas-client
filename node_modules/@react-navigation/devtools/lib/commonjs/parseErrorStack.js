"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var stacktraceParser = _interopRequireWildcard(require("stacktrace-parser"));

var _parseHermesStack = _interopRequireDefault(require("./parseHermesStack"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function convertHermesStack(stack) {
  const frames = [];

  for (const entry of stack.entries) {
    if (entry.type !== 'FRAME') {
      continue;
    }

    const {
      location,
      functionName
    } = entry;

    if (location.type === 'NATIVE') {
      continue;
    }

    frames.push({
      methodName: functionName,
      file: location.sourceUrl,
      lineNumber: location.line1Based,
      column: location.type === 'SOURCE' ? location.column1Based - 1 : location.virtualOffset0Based
    });
  }

  return frames;
}

function parseErrorStack(errorStack) {
  if (!errorStack) {
    return [];
  }

  const parsedStack = Array.isArray(errorStack) ? errorStack : global.HermesInternal ? convertHermesStack((0, _parseHermesStack.default)(errorStack)) : stacktraceParser.parse(errorStack).map(frame => ({ ...frame,
    column: frame.column != null ? frame.column - 1 : null
  }));
  return parsedStack;
}

var _default = parseErrorStack;
exports.default = _default;
//# sourceMappingURL=parseErrorStack.js.map