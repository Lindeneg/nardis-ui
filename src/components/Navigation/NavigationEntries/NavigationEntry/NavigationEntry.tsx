import { NavLink } from 'react-router-dom';

import Styles from './NavigationEntry.module.css';
import { 
    Functional, 
    RouterRouteLinkProps 
} from '../../../../common/props';


/**
 * Component for a single entry in a list of navigation items. 
 */
const navigationEntry: Functional<RouterRouteLinkProps> = (
    props: RouterRouteLinkProps
): JSX.Element => (
    <li className={Styles.NavigationEntry}>
        <NavLink
            exact={props.exact}
            activeClassName={Styles.active}
            to={props.link}
            style={props.style}
        >
            {props.children}
        </NavLink>
    </li>
);


export default navigationEntry;