import styles from './Backdrop.module.css';

import { 
    BackdropProp
} from '../../types';


/**
 * Backdrop used to mask elements with z-index < 100 behind elements with z-index > 100.
 */

const backdrop = (props: BackdropProp): JSX.Element | null => (
    props.show ? <div onClick={props.clicked} className={styles.Backdrop}></div> : null
);


export default backdrop;