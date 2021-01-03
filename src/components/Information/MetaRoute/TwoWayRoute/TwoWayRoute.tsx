import { City, RouteCargo } from 'nardis-game';

import OneWayRoute from './../OneWayRoute/OneWayRoute';
import Styles from './TwoWayRoute.module.css';
import { Direction } from '../../../../common/constants';
import { Functional, Props } from '../../../../common/props';


interface TwoWayRouteProps extends Props {
    cityOne: {city: City | null, routeCargo: RouteCargo[] | null},
    cityTwo: {city: City | null, routeCargo: RouteCargo[] | null}
};


/**
 * Component to display a potential route in both directions.
 */
const twoWayRoute: Functional<TwoWayRouteProps> = (
    props: TwoWayRouteProps
): JSX.Element => (
    <div className={Styles.TwoWayRoute}>
        <OneWayRoute 
            cityOne={{
                showSize: true,
                direction: Direction.Departure,
                city: props.cityOne.city,
                cityNameColor: 'yellow',
                routeCargo: props.cityOne.routeCargo || []
            }}
            cityTwo={{
                showSize: true,
                direction: Direction.Arrival,
                city: props.cityTwo.city,
                cityNameColor: 'lightgreen',
                routeCargo: props.cityTwo.routeCargo || []
            }}
        />
        <hr/>
        <OneWayRoute 
            cityOne={{
                showSize: false,
                direction: Direction.Departure,
                city: props.cityTwo.city,
                cityNameColor: 'lightgreen',
                routeCargo: props.cityTwo.routeCargo || []
            }}
            cityTwo={{
                showSize: false,
                direction: Direction.Arrival,
                city: props.cityOne.city,
                cityNameColor: 'yellow',
                routeCargo: props.cityOne.routeCargo || []
            }}
        />
    </div>
);


export default twoWayRoute;