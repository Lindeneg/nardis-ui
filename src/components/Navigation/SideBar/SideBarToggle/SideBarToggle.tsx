import { ClickedProps } from '../../../../common/props';

import styles from './SideBarToggle.module.css';


/**
 * Component that imitates a "burger-menu" button for mobile devices. 
 */

 const sidebarToggle = (props: ClickedProps): JSX.Element => (
    <div className={styles.SidebarToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);


export default sidebarToggle;