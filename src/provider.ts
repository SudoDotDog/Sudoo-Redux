/**
 * @author WMXPY
 * @namespace Redux
 * @description Provider
 */

import { createElement } from "react";
import { Provider } from "react-redux";
import { SudooRedux } from "./index";

export type SudooReduxProviderType = {

    redux: SudooRedux;
    children: any;
};

export const SudooProvider: React.SFC<SudooReduxProviderType> =
    (props: SudooReduxProviderType) =>
        createElement(Provider as any, {
            store: props.redux.createStore(),
        }, props.children);
