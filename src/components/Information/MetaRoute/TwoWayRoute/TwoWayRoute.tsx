import OneWayRoute from './../OneWayRoute/OneWayRoute';
import ITwoWayRouteProps from './TwoWayRoute.props';
import styles from './TwoWayRoute.module.css';


const twoWayRoute = (props: ITwoWayRouteProps): JSX.Element => (
    <div className={styles.TwoWayRoute}>
        <OneWayRoute 
            cityOne={{
                showSize: true,
                from: true,
                city: props.cityOne.city,
                cityNameColor: 'yellow',
                routeCargo: props.cityOne.routeCargo || []
            }}
            cityTwo={{
                showSize: true,
                from: false,
                city: props.cityTwo.city,
                cityNameColor: 'lightgreen',
                routeCargo: props.cityTwo.routeCargo || []
            }}
        />
        <hr/>
        <OneWayRoute 
            cityOne={{
                showSize: false,
                from: true,
                city: props.cityTwo.city,
                cityNameColor: 'lightgreen',
                routeCargo: props.cityTwo.routeCargo || []
            }}
            cityTwo={{
                showSize: false,
                from: false,
                city: props.cityOne.city,
                cityNameColor: 'yellow',
                routeCargo: props.cityOne.routeCargo || []
            }}
        />
    </div>
);

export default twoWayRoute;