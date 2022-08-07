/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as stacktraceParser from 'stacktrace-parser';
import parseHermesStack from './parseHermesStack';

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

  const parsedStack = Array.isArray(errorStack) ? errorStack : global.HermesInternal ? convertHermesStack(parseHermesStack(errorStack)) : stacktraceParser.parse(errorStack).map(frame => ({ ...frame,
    column: frame.column != null ? frame.column - 1 : null
  }));
  return parsedStack;
}

export default parseErrorStack;
//# sourceMappingURL=parseErrorStack.js.map