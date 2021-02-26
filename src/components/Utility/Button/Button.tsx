import Styles from './Button.module.css';
import { ButtonType, buttonTypeToClassName } from '../../../common/constants';
import { 
    Clickable, 
    Functional, 
    OnClickFunc, 
    Props 
} from '../../../common/props';
import { Fragment } from 'react';


export interface ButtonProps extends Props, Clickable<OnClickFunc> {
    disabled  : boolean,
    buttonType: ButtonType,
    altText?: {
        left: string,
        right: string
    }
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
        className={[Styles.Button, Styles[buttonTypeToClassName[props.buttonType]]].join(' ')}
        style={props.style}
    >
        {props.altText ? (
            <Fragment>
                <span style={{float: 'left'}}>{props.altText.left}</span>
                <span style={{float: 'right'}}>{props.altText.right}</span>
            </Fragment>
        ) : props.children}
    </button>
);


export default button;