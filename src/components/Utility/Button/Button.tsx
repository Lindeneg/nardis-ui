import IButtonProps from './Button.props';
import { buttonTypeToClassName } from './buttonType';

import styles from './Button.module.css';


const button = (props: IButtonProps): JSX.Element => (
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