import Styles from './Backdrop.module.css';
import { 
    Clickable, 
    Functional, 
    OnClickFunc, 
    Props 
} from '../../../common/props';


interface BackdropProps extends Props, Clickable<OnClickFunc> {
    show: boolean
};


/**
 * Backdrop used to mask elements with z-index < 100 behind elements with z-index > 100.
 */

const backdrop: Functional<BackdropProps, JSX.Element | null> = (
    props: BackdropProps
): JSX.Element | null => (
    props.show ? <div onClick={props.whenClicked} className={Styles.Backdrop}></div> : null
);


export default backdrop;