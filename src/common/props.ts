import React from 'react';
import { Dispatch } from 'redux';

import { Train } from 'nardis-game';

import { ReducerAction } from './actions';


/**
 * Collection of frequently used props and/or generic types.
 */

       type ChangedElements                = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type Func<P, R>                     = (p: P) => R;
export type IdFunc                         = Func<string, void>;
export type Functional<P, R = JSX.Element> = Func<P, R>;
export type ChangedEventElement            = React.ChangeEvent<ChangedElements>;
export type FormEvent                      = React.FormEvent<HTMLFormElement>;
export type OnChangedEventFunc             = Func<ChangedEventElement, void>;
export type OnFormEventFunc                = Func<FormEvent, void>;
export type OnFormChangeFunc<K>            = (e: ChangedEventElement, k: K) => void;
export type OnDispatch                     = Dispatch<ReducerAction>;
export type MapDispatch<T>                 = Func<OnDispatch, T>;
export type MapState<S, P>                 = Func<S, P>;
export type OnClickFunc<
    H = HTMLElement, 
    E = MouseEvent
>                                          = Func<React.MouseEvent<H, E>, void>;

export interface Clickable<F> {
    whenClicked  : F
};

export interface Indexable<T> {
    [key: string]: T
};

export interface NIndexable<T> {
    [key: number]: T
};

export interface Changeable {
    changed      : OnChangedEventFunc
};

export interface Props {
    children    ?: React.ReactNode,
    style       ?: React.CSSProperties
};

export interface RouterRouteProps extends Props {
    active      ?: boolean,
    exact       ?: boolean
};

export interface RouterRouteLinkProps extends RouterRouteProps {
    link         : string
};

export interface PossibleTrain {
    train        : Train,
    cost         : number
};