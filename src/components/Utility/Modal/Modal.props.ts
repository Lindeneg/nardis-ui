import { ReactNode } from 'react';

export default interface ModalProps {
    show: boolean,
    onClose: () => void,
    children?: ReactNode
}