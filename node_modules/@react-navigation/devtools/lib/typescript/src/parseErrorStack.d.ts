/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface StackFrame {
    methodName: string;
    file: string;
    lineNumber: number;
    column: number;
}
declare function parseErrorStack(errorStack?: string | StackFrame[]): StackFrame[];
export default parseErrorStack;
