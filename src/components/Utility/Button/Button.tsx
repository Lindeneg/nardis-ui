import { ButtonType, buttonTypeToClassName } from './buttonType';
import { Clickable, Functional, OnClickFunc, Props } from '../../../common/props';
import styles from './Button.module.css';


export interface ButtonProps extends Props, Clickable<OnClickFunc> {
    disabled  : boolean,
    buttonType: ButtonType,
};


/**
 * Simple button component with no background or borders by default.
 */
const button: Functional<ButtonProps> = (
    props: ButtonProps
): JSX.Element => (
    <button
        onClick={props.whenClicked}
        disabled={props.disabled}
        className={[styles.Button, styles[buttonTypeToClassName[props.buttonType]]].join(' ')}
        style={props.style}
    >
        {props.children}
    </button>
);


export default button;