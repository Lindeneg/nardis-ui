import NavigationEntries from './NavigationEntries/NavigationEntries';
import SideBarToggle from './SideBar/SideBarToggle/SideBarToggle';
import styles from './Navigation.module.css';

import { ClickedProp } from '../../types';


/**
 * 
 */
const navigation = (props: ClickedProp): JSX.Element => (
    <header className={styles.Navigation}>
        <SideBarToggle clicked={props.clicked} />
        <nav className={styles.DesktopExclusive}>
            <NavigationEntries />
        </nav>
    </header>
);

export default navigation;