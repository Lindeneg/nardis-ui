import { NavLink } from 'react-router-dom';

import styles from './NavigationEntry.module.css';

import { 
    NavigationItemProp 
} from "../../../../types";


/**
 * Component for a single entry in a list of navigation items. 
 */

const navigationEntry = (props: NavigationItemProp): JSX.Element => (
    <li className={styles.NavigationEntry}>
        <NavLink
            exact={props.exact}
            activeClassName={styles.active}
            to={props.link}
        >
            {props.children}
        </NavLink>
    </li>
);


export default navigationEntry;