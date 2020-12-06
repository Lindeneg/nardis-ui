import { ReactNode } from 'react';
import { BaseProps } from '../../common/props';


export interface LayoutMappedProps {
    gameCreated: boolean,
    money      : number,
    level      : number,
    turn       : number,
    routes     : number,
    queue      : number,
    opponents  : number
}

export default interface LayoutProps extends LayoutMappedProps, BaseProps {
    [key: string]: number | string | ReactNode
}