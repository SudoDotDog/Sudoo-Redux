/**
 * @author WMXPY
 * @namespace Redux
 * @description Connect
 */

import { ComponentType } from "react";
import { connect } from "react-redux";
import { Action } from "redux";

export class Connector<S, P> {

    public static create<S, P>(): Connector<S, P> {

        return new Connector<S, P>();
    }

    private _connectedStatesFunction: ((store: S) => Partial<P>) | null;
    private _connectedActions: ((dispatch: (action: Action) => void) => Partial<P>) | Partial<P> | null;

    private constructor() {

        this._connectedStatesFunction = null;
        this._connectedActions = null;
    }

    public connectStates(connector: (store: S) => Partial<P>): Connector<S, P> {

        this._connectedStatesFunction = connector;
        return this;
    }

    public connectActions(connector: ((dispatch: (action: Action) => void) => Partial<P>) | Partial<P>): Connector<S, P> {

        this._connectedActions = connector;
        return this;
    }

    public connect<NewProps>(Component: any): ComponentType<NewProps> {

        return connect(this._connectedStatesFunction, this._connectedActions)(Component) as any as ComponentType<NewProps>;
    }
}
