import ButtonProps from './Button.props';
import { buttonTypeToClassName } from './buttonType';

import styles from './Button.module.css';


const button = (props: ButtonProps): JSX.Element => (
    <button
        onClick={props.whenClicked}
        disabled={props.disabled}
        className={[styles.Button, styles[buttonTypeToClassName[props.buttonType]]].join(' ')}
    >
        {props.children}
    </button>
);

export default button;