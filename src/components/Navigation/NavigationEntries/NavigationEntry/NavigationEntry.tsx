import { NavLink } from 'react-router-dom';

import { Functional, RouterRouteLinkProps } from '../../../../common/props';
import styles from './NavigationEntry.module.css';


/**
 * Component for a single entry in a list of navigation items. 
 */
const navigationEntry: Functional<RouterRouteLinkProps> = (
    props: RouterRouteLinkProps
): JSX.Element => (
    <li className={styles.NavigationEntry}>
        <NavLink
            exact={props.exact}
            activeClassName={styles.active}
            to={props.link}
            style={props.style}
        >
            {props.children}
        </NavLink>
    </li>
);


export default navigationEntry;