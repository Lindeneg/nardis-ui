import { connect } from "react-redux";

import { Route, RouteState } from "nardis-game";

import NardisState from "../../../common/state";
import { IdFunc, MapDispatch, OnDispatch, Props } from "../../../common/props";
import Styles from './ManageRoute.module.css';

import MetaRoute from '../../../components/Information/MetaRoute/MetaRoute';
import { Component, Fragment } from "react";
import { metaRouteActiveHeaderNames } from "../../../common/constants";
import { NardisAction } from "../../../common/actions";


interface ManageRouteState {
    deleteInitiated: boolean,
    deleteConfirmed: boolean
};

interface BuildRouteMappedProps {
    routes: Route[]
};

interface BuildRouteDispatchedProps {
    removeRouteFromRoutes: IdFunc,
};

interface ManageRouteProps extends Props, BuildRouteMappedProps, BuildRouteDispatchedProps {}


const mapStateToProps = (
    state: NardisState
): BuildRouteMappedProps => ({
    routes: state.routes
});

const mapDispatchToProps: MapDispatch<BuildRouteDispatchedProps> = (
    dispatch: OnDispatch
): BuildRouteDispatchedProps => (
    {
        removeRouteFromRoutes: (routeId: string) => dispatch(
            {
                type: NardisAction.REMOVE_FROM_PLAYER_ROUTE,
                payload: {
                    removeRouteFromRoutes: {
                        routeId
                    }
                }
            }
        )
    }
);


class ManageRoute extends Component<ManageRouteProps, ManageRouteState> {

    state: ManageRouteState = {
        deleteInitiated: false,
        deleteConfirmed: false
    };

    // TODO redo have double confirmation before deleting
    onDelete = (id: string) => {
        this.props.removeRouteFromRoutes(id);
        this.setState({...this.state, deleteConfirmed: true});
    }


    render () {
        return (
            <Fragment>
                <hr/>
                {this.props.routes.length <= 0 ? <p className={Styles.NoRoutes}>NO ACTIVE ROUTES</p> :
                <div className={Styles.Container}>
                {this.props.routes.map((route: Route, index: number): JSX.Element => {
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
                            deleteRouteDisabled={false}
                            editRouteFunc={() => null}
                            deleteRouteFunc={this.onDelete}
                            id={route.id}
                            headers={metaRouteActiveHeaderNames}
                            values={[
                                routeState,
                                distance > 0 ? distance + 'KM' : 'IN CITY',
                                route.getKilometersTravelled() + 'KM',
                                route.getProfit() + 'G'
                            ]}
                            arrowColors={{toCityOne: a1, toCityTwo: a2}}
                        />
                )})}
                </div>}
            </Fragment>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageRoute);