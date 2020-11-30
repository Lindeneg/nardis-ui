import { ReactNode } from 'react';

export interface BaseProps {
    children: ReactNode
}

export interface ClickedProps {
    clicked: () => void
}

export type NoProps = any;