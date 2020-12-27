import { Clickable, Functional, OnClickFunc, Props } from '../../../../common/props';
import SignType from './signType';
import styles from './Sign.module.css';


export interface SignProps extends Props, Clickable<OnClickFunc> {
    signType: SignType,
    disabled?: boolean,
};


/**
 * Clickable plus ('+') or minus ('-') sign.
 * Desktop: transparent circle with background color on hover. circles are vertically aligned, 
 * Mobile : transparent rectangle with background color on hover. rectangles are horizontally aligned, 
 */
const sign: Functional<SignProps> = (
    props: SignProps
): JSX.Element => {
    const isPlus: boolean = props.signType === SignType.PLUS
    return (
    <div 
        className={[styles.Sign, isPlus ? styles.Plus : styles.Minus, props.disabled ? styles.NotAccess : styles.Access].join(' ')}
        onClick={!props.disabled && props.whenClicked ? props.whenClicked : () => null}
    >
        <div>
            {isPlus ? '+' : '-'}
        </div>
    </div>
    );
};


export default sign;