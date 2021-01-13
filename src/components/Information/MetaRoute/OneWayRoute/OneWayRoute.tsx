import Styles from './OneWayRoute.module.css';
import CityRect, { CityRectProps } from '../../CityRect/CityRect';
import { 
    Functional, 
    Props 
} from '../../../../common/props';


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
    <div className={Styles.CityRects}>
        <CityRect {...props.cityOne} />
        <CityRect {...props.cityTwo} />
    </div>
);


export default oneWayRoute;