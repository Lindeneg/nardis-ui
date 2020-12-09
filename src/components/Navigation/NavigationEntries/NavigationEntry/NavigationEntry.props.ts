import { ReactNode } from 'react';

export default interface INavigationItemProp {
    link: string,
    style?: {[key: string]: string},
    active?: boolean,
    exact?: boolean
    children?: ReactNode
}