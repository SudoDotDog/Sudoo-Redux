/**
 * @author WMXPY
 * @namespace Redux
 * @description Connect
 */

import { ComponentType } from "react";
import { connect } from "react-redux";
import { Action } from "redux";

export class Connector<S, SP, AP> {

    public static create<S, SP = {}, AP = {}>(): Connector<S, SP, AP> {

        return new Connector<S, SP, AP>();
    }

    private _connectedStatesFunction: ((store: S) => SP) | null;
    private _connectedActions: ((dispatch: (action: Action) => void) => AP) | AP | null;

    private constructor() {

        this._connectedStatesFunction = null;
        this._connectedActions = null;
    }

    public connectStates(connector: (store: S) => SP): Connector<S, SP, AP> {

        this._connectedStatesFunction = connector;
        return this;
    }

    public connectActions(connector: ((dispatch: (action: Action) => void) => AP) | AP): Connector<S, SP, AP> {

        this._connectedActions = connector;
        return this;
    }

    public connect<NewProps>(Component: React.ComponentType<any>): ComponentType<NewProps> {

        const defaultConnectedAction = {};
        return connect(
            this._connectedStatesFunction,
            this._connectedActions || defaultConnectedAction,
        )(Component) as any as ComponentType<NewProps>;
    }
}
