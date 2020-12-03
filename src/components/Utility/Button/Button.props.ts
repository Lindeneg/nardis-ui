import { ReactNode } from 'react';
import { ButtonType } from '../../../common/buttonType';


export default interface ButtonProps {
    whenClicked: () => void,
    disabled: boolean,
    buttonType: ButtonType,
    children?: ReactNode
}