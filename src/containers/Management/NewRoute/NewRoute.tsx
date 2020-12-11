import { Component } from 'react';
import { connect } from 'react-redux';

import { City, PotentialRoute } from 'nardis-game';
import TwoWayRoute from '../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import { INardisState } from '../../../common/state';
import INewRouteProps, { RouteInfo } from './NewRoute.props';
import INewRouteState from './NewRoute.state';


class NewRoute extends Component<INewRouteProps> {

    state: INewRouteState = {
        cityOne: null,
        cityTwo: null,
        distance: 0,
        purchasedOnTurn: 0,
        turnCost: 0,
        otherRoutes: [],
        possibleTrains: []
    };

    componentDidMount = (): void => {
        if (!this.state.cityOne && this.props.game) {
            const startCity: City = this.props.game.getCurrentPlayer().getStartCity();
            const possibleRoutes: RouteInfo = this.getPossibleRouteInfo(startCity);
            if (possibleRoutes.routes.length > 0) {
                this.setState({
                    ...this.getStateFromPotentialRoute(possibleRoutes.routes[0]),
                    otherRoutes: possibleRoutes.otherRoutes,
                    possibleTrains: possibleRoutes.trains
                });
            } else {
                this.setState({
                    ...this.state,
                    cityOne: startCity
                });
            }
        }
    }

    getStateFromPotentialRoute = (route: PotentialRoute): INewRouteState => ({
        ...this.state,
        cityOne: route.cityOne,
        cityTwo: route.cityTwo,
        distance: route.distance,
        purchasedOnTurn: route.purchasedOnTurn,
        turnCost: route.turnCost
    })

    getPossibleRouteInfo = (city: City): RouteInfo => {
        const result: RouteInfo = {routes: [], otherRoutes: [], trains: []};
        if (this.props.game) {
            const routes: PotentialRoute[] = this.props.game.getArrayOfPossibleRoutes(city);
            if (routes.length > 0) {
                routes.sort((a, b) => a.distance - b.distance);
                result.routes = routes;
                result.otherRoutes = routes.filter((_, i: number) => i !== 0);
                result.trains = this.props.game.getArrayOfAdjustedTrains();
            }
        }
        return result;
    }

    onOriginChangeHandler = (): void => {
        console.log("change origin");
    }

    onDestinationChangeHandler = (): void => {
        console.log(this.state.otherRoutes);
        this.setState({
            ...this.getStateFromPotentialRoute(this.state.otherRoutes[0])
        });

    }

    render(): JSX.Element {
        return (
            <TwoWayRoute 
                cityOne={this.state.cityOne}
                cityTwo={this.state.cityTwo}
                routesLength={this.props.game?.getCurrentPlayer().getRoutes().length || 0}
                otherRoutesLength={this.state.otherRoutes.length}
                whenClickOrigin={this.onOriginChangeHandler}
                whenClickDestination={this.onDestinationChangeHandler}
            />
        );
    }
}


const mapStateToProps = (state: INardisState): INewRouteProps => ({
    game: state._game
});


export default connect(mapStateToProps)(NewRoute);