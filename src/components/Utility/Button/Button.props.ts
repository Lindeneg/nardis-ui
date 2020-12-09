import { ReactNode } from 'react';
import { ButtonType } from './buttonType';
import { IStyle } from '../../../common/props';


export default interface IButtonProps extends IStyle {
    whenClicked: () => void,
    disabled: boolean,
    buttonType: ButtonType,
    children?: ReactNode
}