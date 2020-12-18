import { ReactNode } from 'react';
import { IBaseProps } from '../../common/props';


export interface ILayoutMappedProps {
    gameCreated: boolean,
    money      : number,
    level      : number,
    turn       : number,
    range      : number,
    routes     : number,
    queue      : number,
    opponents  : number
}

export default interface LayoutProps extends ILayoutMappedProps, IBaseProps {
    [key: string]: number | string | ReactNode
}