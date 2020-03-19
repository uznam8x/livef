import {createContext} from 'react';
import { IBox } from './types';

export const {Provider, Consumer} =  createContext({
    state: {},
    actions: {
        update: (list: IBox[], index: number | null = null, item: IBox | null = null) => {}
    },
});