import { CSSProperties, ReactNode } from 'react';

export type NoProps = any;

export interface IBaseProps {
    children: ReactNode
}

export interface IStyle {
    style?: CSSProperties
}

export interface IClickedProps {
    clicked: () => void
}














export interface Props {
    children?: ReactNode,
    style?: CSSProperties
} 

export type StdFunc<P, R> = (p: P) => R;

export type Functional<P> = StdFunc<P, JSX.Element>;

export interface Clickable<F> {
    clicked: F
}

export interface Indexable<T> {
    [key: string]: T
}