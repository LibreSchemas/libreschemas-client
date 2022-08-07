/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface HermesStackLocationNative {
    type: 'NATIVE';
}
interface HermesStackLocationSource {
    type: 'SOURCE';
    sourceUrl: string;
    line1Based: number;
    column1Based: number;
}
interface HermesStackLocationBytecode {
    type: 'BYTECODE';
    sourceUrl: string;
    line1Based: number;
    virtualOffset0Based: number;
}
declare type HermesStackLocation = HermesStackLocationNative | HermesStackLocationSource | HermesStackLocationBytecode;
interface HermesStackEntryFrame {
    type: 'FRAME';
    location: HermesStackLocation;
    functionName: string;
}
interface HermesStackEntrySkipped {
    type: 'SKIPPED';
    count: number;
}
declare type HermesStackEntry = HermesStackEntryFrame | HermesStackEntrySkipped;
export interface HermesParsedStack {
    message: string;
    entries: HermesStackEntry[];
}
export default function parseHermesStack(stack: string): HermesParsedStack;
export {};
