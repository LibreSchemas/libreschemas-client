import type { NavigationAction, NavigationContainerRef, NavigationState } from '@react-navigation/core';
import * as React from 'react';
declare type InitData = {
    type: 'init';
    state: NavigationState | undefined;
};
declare type ActionData = {
    type: 'action';
    action: NavigationAction;
    state: NavigationState | undefined;
    stack: string | undefined;
};
export default function useDevToolsBase(ref: React.RefObject<NavigationContainerRef<any>>, callback: (result: InitData | ActionData) => void): {
    resetRoot: (state: NavigationState) => void;
};
export {};
