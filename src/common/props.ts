import { ReactNode } from 'react';

export type TStyle = {[key: string]: string}

export type NoProps = any;

export interface IBaseProps {
    children: ReactNode
}

export interface IStyle {
    style?: TStyle
}

export interface IClickedProps {
    clicked: () => void
}