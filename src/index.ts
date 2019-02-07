/**
 * @author WMXPY
 * @namespace Redux
 * @description Index
 */

import { _Map } from "@sudoo/bark/map";
import { AnyAction, createStore, Reducer, Store } from "redux";

export class SudooRedux<TStore = any, TAction = any> {

    public static create<TStore, TAction>(initStore: TStore) {

        return new SudooRedux<TStore, TAction>(initStore);
    }

    private _initStore: TStore;
    private _reducerMap: Map<TAction, (current: TStore, action: any) => TStore>;

    private constructor(initStore: TStore) {

        this._initStore = initStore;
        this._reducerMap = new Map<TAction, (current: TStore, action: any) => TStore>();
    }

    public createStore(): Store<TStore> {

        const reducer: Reducer<TStore, AnyAction> = this._reducer.bind(this) as Reducer<TStore, AnyAction>;
        return createStore(reducer);
    }

    public reducer(action: TAction, reducer: ((current: TStore, reducer: any) => TStore)): SudooRedux<TStore, TAction> {

        this._reducerMap.set(action, reducer);
        return this;
    }

    public reducers(actions: Record<string, (current: TStore, reducer: any) => TStore>): SudooRedux<TStore, TAction> {

        _Map.keys(actions).forEach((name: string) => {
            this.reducer(name as any as TAction, actions[name]);
        });
        return this;
    }

    private _reducer<TReducer extends AnyAction>(current: TStore, action: TReducer) {

        if (this._reducerMap.has(action.type)) {

            const reducer: (current: TStore, reducer: AnyAction) => TStore = this._reducerMap.get(action.type) as (current: TStore, reducer: AnyAction) => TStore;
            const result: TStore = reducer(current, action);
            return result;
        }
        return this._initStore;
    }
}

export { Action, AnyAction, Reducer, Store } from 'redux';
export { Connector } from './connect';
export { SudooProvider } from './provider';

