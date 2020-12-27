import { Clickable, Props, OnClickFunc, Functional } from '../../../../common/props';
import styles from './SideBarToggle.module.css';


interface SideBarToggleProps extends Props, Clickable<OnClickFunc> {};


/**
 * Component that imitates a "burger-menu" button for mobile devices. 
 */
 const sidebarToggle: Functional<SideBarToggleProps> = (
     props: SideBarToggleProps
): JSX.Element => (
    <div className={styles.SidebarToggle} onClick={props.whenClicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);


export default sidebarToggle;