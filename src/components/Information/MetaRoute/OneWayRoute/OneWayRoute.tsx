import CityRect, { CityRectProps } from '../../CityRect/CityRect';
import { Functional, Props } from '../../../../common/props';
import styles from './OneWayRoute.module.css';


interface OneWayRouteProps extends Props {
    cityOne: CityRectProps,
    cityTwo: CityRectProps,
};


/**
 * Component to display a potential route in a single direction.
 */
const oneWayRoute: Functional<OneWayRouteProps> = (
    props: OneWayRouteProps
): JSX.Element => (
    <div className={styles.CityRects}>
        <CityRect {...props.cityOne} />
        <CityRect {...props.cityTwo} />
    </div>
);


export default oneWayRoute;