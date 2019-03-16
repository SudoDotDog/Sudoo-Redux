/**
 * @author WMXPY
 * @namespace Renderer_Util
 * @description Redux Test
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Store } from 'redux';
import { Redux } from '../../src';

describe('Given a {Redux} class', (): void => {

    const chance: Chance.Chance = new Chance('renderer-util-redux');

    const redux = (initial: any = {
        key: chance.string(),
    }): Redux<any, any> => Redux.create(initial);

    it('should be able to construct', (): void => {

        const clazz: Redux<any, any> = redux();

        // tslint:disable-next-line
        expect(clazz).to.be.exist;
    });

    it('should be able to create store', (): void => {

        const clazz: Redux<any, any> = redux();
        const store: Store = clazz.createStore();

        // tslint:disable-next-line
        expect(store).to.be.exist;
    });
});
