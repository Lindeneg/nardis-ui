import { Fragment } from "react";

import Button from '../../../Utility/Button/Button';
import CityRect from '../../CityRect/CityRect';
import IOneWayRoute from "./OneWayRoute.props";
import styles from './OneWayRoute.module.css';


const oneWayRoute = (props: IOneWayRoute) => (
    <Fragment>
        <Button {...props.button}>
            {props.button.content}
        </Button>
        <div className={styles.CityRects}>
            <CityRect {...props.cityOne} />
            <CityRect {...props.cityTwo} />
        </div>
    </Fragment>
)

export default oneWayRoute;