import { Route, RouteState } from "nardis-game";

import MetaRoute from '../../../../components/Information/MetaRoute/MetaRoute';
import { metaRouteActiveHeaderNames, metaRouteEditHeaderNames } from '../../../../common/constants';
import { Functional, IdFunc, Props } from '../../../../common/props';


interface GetMetaRouteProps extends Props {
    route         : Route,
    editDisabled  : boolean,
    deleteDisabled: boolean,
    onEdit        : IdFunc,
    onDelete      : IdFunc,
    isEditing    ?: boolean,
    index        ?: number
};


const getHeaderValues = (route: Route, distance: number, isEditing: boolean, routeState: string): {
    headers: string[];
    values: (string)[];
} => {
    if (isEditing) {
        return {
            headers: metaRouteEditHeaderNames,
            values: [
                route.getDistance() + 'KM',
                route.getKilometersTravelled().toLocaleString() + 'KM',
                route.getProfit().toLocaleString() + 'G',
                route.getPurchasedOnTurn().toLocaleString()
            ]
        }
    } else {
        return {
            headers: metaRouteActiveHeaderNames,
            values: [
                routeState,
                distance > 0 ? distance + 'KM' : 'IN CITY',
                route.getKilometersTravelled().toLocaleString() + 'KM',
                route.getProfit().toLocaleString() + 'G'
            ]
        };
    }
}


/**
 * 
 */
const getMetaRoute: Functional<GetMetaRouteProps> = (props: GetMetaRouteProps): JSX.Element => {
    const state: RouteState = props.route.getRouteState();
    const destCityOne: boolean = state.destination.equals(props.route.getCityOne());
    const distance: number = state.distance > 0 ? state.distance : 0;
    let c1: string = '#ccc'; let c2: string = '#ccc';
    let a1: string = '#ccc'; let a2: string = '#ccc';
    let routeState: string;

    if (destCityOne && distance < 1) { c1 = 'lightcoral'; } 
    else if (!destCityOne && distance < 1) { c2 = 'lightcoral'; }
    else if (destCityOne && distance > 0) { a1 = 'lightcoral' }
    else if (!destCityOne && distance > 0) { a2 = 'lightcoral' }

    if (!state.hasArrived && distance <= 0) { routeState = 'UNLOADING'; }
    else if (state.hasArrived && distance <= 0) { routeState = 'LOADING'; }
    else { routeState = 'EN ROUTE'; }

    return (
        <MetaRoute
            key={props.index}
            cityOne={{city: props.route.getCityOne(), color: c1}}
            cityTwo={{city: props.route.getCityTwo(), color: c2}}
            editRouteDisabled={props.editDisabled}
            deleteRouteDisabled={props.deleteDisabled}
            editRouteFunc={props.onEdit}
            deleteRouteFunc={props.onDelete}
            id={props.route.id}
            {...getHeaderValues(props.route, distance, props.isEditing ? true : false, routeState)}
            arrowColors={{toCityOne: a1, toCityTwo: a2}}
            style={props.style}
        />
    );   
}


export default getMetaRoute;