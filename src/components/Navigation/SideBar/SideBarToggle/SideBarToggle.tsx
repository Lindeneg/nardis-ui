import styles from './SideBarToggle.module.css';

import {
    ClickedProp
} from '../../../../types';


/**
 * Component that imitates a "burger-menu" button for mobile devices. 
 */

 const sidebarToggle = (props: ClickedProp): JSX.Element => (
    <div className={styles.SidebarToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);


export default sidebarToggle;