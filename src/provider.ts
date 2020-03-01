/**
 * @author WMXPY
 * @namespace Redux
 * @description Provider
 */

import { createElement } from "react";
import { Provider } from "react-redux";
import { Redux } from "./index";

export type ReduxProviderType = {

    redux: Redux;
    children: any;
};

export const ReduxProvider: React.SFC<ReduxProviderType> = (props: ReduxProviderType) => {

    const target: any = Provider as any;
    const args: any = {
        store: props.redux.createStore(),
    };
    return createElement(target, args, props.children);
};
