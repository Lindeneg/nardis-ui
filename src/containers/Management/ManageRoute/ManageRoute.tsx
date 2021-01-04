import { connect } from "react-redux";

import { Route, RouteState } from "nardis-game";

import NardisState from "../../../common/state";
import { Functional, Props } from "../../../common/props";
import Styles from './ManageRoute.module.css';

import MetaRoute from '../../../components/Information/MetaRoute/MetaRoute';
import { Fragment } from "react";
import { metaRouteActiveHeaderNames } from "../../../common/constants";


interface BuildQueueMappedProps {
    routes: Route[]
};

interface ManageRouteProps extends Props, BuildQueueMappedProps {}

const mapStateToProps = (
    state: NardisState
): BuildQueueMappedProps => ({
    routes: state.routes
});

const tempBtn = (id: string) => console.log(id); // TODO connect removeFromQueue function


/**
 * 
 */
const manageRoute: Functional<ManageRouteProps> = (
    props: ManageRouteProps
): JSX.Element => (
    <Fragment>
        <hr/>
        {props.routes.length <= 0 ? <p className={Styles.NoRoutes}>NO ACTIVE ROUTES</p> :
        <div className={Styles.Container}>
        {props.routes.map((route: Route, index: number): JSX.Element => {
            const state: RouteState = route.getRouteState();
            const destCityOne: boolean = state.destination.equals(route.getCityOne());
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
                    key={index}
                    cityOne={{city: route.getCityOne(), color: c1}}
                    cityTwo={{city: route.getCityTwo(), color: c2}}
                    editRouteDisabled={true}
                    editRouteFunc={tempBtn}
                    deleteRouteFunc={tempBtn}
                    id={route.id}
                    headers={metaRouteActiveHeaderNames}
                    values={[
                        routeState,
                        distance + 'KM',
                        route.getKilometersTravelled() + 'KM',
                        route.getProfit() + 'G'
                    ]}
                    arrowColors={{toCityOne: a1, toCityTwo: a2}}
                />
        )})}
        </div>}
    </Fragment>
);


export default connect(mapStateToProps)(manageRoute);