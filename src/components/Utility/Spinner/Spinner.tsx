import { Redirect } from 'react-router-dom';

import Styles from './Spinner.module.css';
import { Functional, Props } from "../../../common/props";


interface SpinnerProps extends Props {
    redirectTo?: string
}


/**
 * Spinner that ... spins and optionally redirects to a specified path.
 */
const spinner: Functional<SpinnerProps> = (
    props: SpinnerProps
): JSX.Element => (
    <div className={Styles.Loader}>
        {props.redirectTo ? <Redirect to={props.redirectTo} /> : null}
    </div>
);


export default spinner;