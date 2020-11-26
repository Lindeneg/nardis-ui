import {
    ClickedProp
} from '../../../../types';
import styles from './SideBarToggle.module.css';


const sidebarToggle = (props: ClickedProp): JSX.Element => (
    <div className={styles.SidebarToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sidebarToggle;