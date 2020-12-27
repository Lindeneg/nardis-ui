import NavigationEntries from './NavigationEntries/NavigationEntries';
import SideBarToggle from './SideBar/SideBarToggle/SideBarToggle';
import { Clickable, Props, OnClickFunc, Functional } from '../../common/props';
import { mainNavigationBarEntries } from '../../common/constants';
import styles from './Navigation.module.css';


interface NavigationProps extends Props, Clickable<OnClickFunc> {};


/**
 * Navigation holds two components for SideBar control and the actual menu items.
 */
const navigation: Functional<NavigationProps> = (props: NavigationProps): JSX.Element => (
    <header className={styles.Navigation}>
        <SideBarToggle {...props} />
        <nav className={styles.DesktopExclusive}>
            <NavigationEntries {...mainNavigationBarEntries} />
        </nav>
    </header>
);


export default navigation;