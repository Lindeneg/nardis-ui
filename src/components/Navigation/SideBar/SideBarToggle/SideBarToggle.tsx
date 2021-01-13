import Styles from './SideBarToggle.module.css';
import { 
    Clickable, 
    Props, 
    OnClickFunc, 
    Functional 
} from '../../../../common/props';


interface SideBarToggleProps extends Props, Clickable<OnClickFunc> {};


/**
 * Component that imitates a "burger-menu" button for mobile devices. 
 */
 const sidebarToggle: Functional<SideBarToggleProps> = (
     props: SideBarToggleProps
): JSX.Element => (
    <div className={Styles.SidebarToggle} onClick={props.whenClicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);


export default sidebarToggle;