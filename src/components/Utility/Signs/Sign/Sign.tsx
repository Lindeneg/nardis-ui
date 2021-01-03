import Styles from './Sign.module.css';
import { SignType } from '../../../../common/constants';
import { Clickable, Functional, OnClickFunc, Props } from '../../../../common/props';


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
    const isPlus: boolean = props.signType === SignType.Plus
    return (
    <div 
        className={[Styles.Sign, isPlus ? Styles.Plus : Styles.Minus, props.disabled ? Styles.NotAccess : Styles.Access].join(' ')}
        onClick={!props.disabled && props.whenClicked ? props.whenClicked : () => null}
    >
        <div>
            {isPlus ? '+' : '-'}
        </div>
    </div>
    );
};


export default sign;