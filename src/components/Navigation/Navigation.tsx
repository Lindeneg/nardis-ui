import NavigationEntries from './NavigationEntries/NavigationEntries';
import SideBarToggle from './SideBar/SideBarToggle/SideBarToggle';
import { IClickedProps } from '../../common/props';
import { mainNavigationBarEntries } from '../../common/constants';
import styles from './Navigation.module.css';


/**
 * Navigation holds two components for SideBar control and the actual menu items.
 */

const navigation = (props: IClickedProps): JSX.Element => (
    <header className={styles.Navigation}>
        <SideBarToggle clicked={props.clicked} />
        <nav className={styles.DesktopExclusive}>
            <NavigationEntries {...mainNavigationBarEntries} />
        </nav>
    </header>
);


export default navigation;