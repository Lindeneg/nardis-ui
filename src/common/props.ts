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