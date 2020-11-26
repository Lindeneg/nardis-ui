import { ReactNode } from 'react';


export interface BaseProp {
    children: ReactNode[] | ReactNode
}

export interface NavigationItemProp extends BaseProp {
    link: string,
    active?: boolean,
    exact?: boolean
}

export interface ClickedProp {
    clicked: () => void
} 

export interface BackdropProp extends ClickedProp {
    show: boolean
}

export interface SideBarProps {
    show: boolean,
    onClose: () => void
}

export interface LayoutState {
    showSideBar: boolean
}