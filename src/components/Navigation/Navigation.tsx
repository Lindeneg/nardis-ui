import NavigationEntries from './NavigationEntries/NavigationEntries';
import SideBarToggle from './SideBar/SideBarToggle/SideBarToggle';
import Styles from './Navigation.module.css';
import { mainNavigationBarEntries } from '../../common/constants';
import { 
    Clickable, 
    Props, 
    OnClickFunc, 
    Functional 
} from '../../common/props';


interface NavigationProps extends Props, Clickable<OnClickFunc> {};


/**
 * Navigation holds two components for SideBar control and the actual menu items.
 */
const navigation: Functional<NavigationProps> = (props: NavigationProps): JSX.Element => (
    <header className={Styles.Navigation}>
        <SideBarToggle {...props} />
        <nav className={Styles.DesktopExclusive}>
            <NavigationEntries {...mainNavigationBarEntries} />
        </nav>
    </header>
);


export default navigation;