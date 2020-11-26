import { BackdropProp } from '../../types';
import styles from './Backdrop.module.css';


const backdrop = (props: BackdropProp): JSX.Element | null => (
    props.show ? <div onClick={props.clicked} className={styles.Backdrop}></div> : null
);

export default backdrop;