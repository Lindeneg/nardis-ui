import CityRect from '../../CityRect/CityRect';
import IOneWayRoute from "./OneWayRoute.props";
import styles from './OneWayRoute.module.css';


const oneWayRoute = (props: IOneWayRoute) => (
    <div className={styles.CityRects}>
        <CityRect {...props.cityOne} />
        <CityRect {...props.cityTwo} />
    </div>
)

export default oneWayRoute;