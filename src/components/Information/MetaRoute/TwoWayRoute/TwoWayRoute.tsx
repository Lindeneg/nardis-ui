import OneWayRoute from './../OneWayRoute/OneWayRoute';
import ITwoWayRouteProps from './TwoWayRoute.props';
import styles from './TwoWayRoute.module.css';


const twoWayRoute = (props: ITwoWayRouteProps): JSX.Element => (
    <div className={styles.TwoWayRoute}>
        <OneWayRoute 
            cityOne={{
                showSize: true,
                from: true,
                city: props.cityOne,
                cityNameColor: 'yellow'
            }}
            cityTwo={{
                showSize: true,
                from: false,
                city: props.cityTwo,
                cityNameColor: 'lightgreen'
            }}
        />
        <hr/>
        <OneWayRoute 
            cityOne={{
                showSize: false,
                from: true,
                city: props.cityTwo,
                cityNameColor: 'lightgreen'
            }}
            cityTwo={{
                showSize: false,
                from: false,
                city: props.cityOne,
                cityNameColor: 'yellow'
            }}
        />
        <hr/>
    </div>
);

export default twoWayRoute;