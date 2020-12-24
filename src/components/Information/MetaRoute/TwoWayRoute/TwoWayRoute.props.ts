import { City, RouteCargo } from 'nardis-game';


export default interface ITwoWayRouteProps {
    cityOne: {city: City | null, routeCargo: RouteCargo[] | null},
    cityTwo: {city: City | null, routeCargo: RouteCargo[] | null}
}