import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { City, PotentialRoute } from 'nardis-game';
import TwoWayRoute from '../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import Modal from '../../../components/Utility/Modal/Modal';
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
        possibleTrains: [],
        showModal: false,
        modalContent: []
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
        this.setState({
            ...this.state,
            showModal: true,
            modalContent: this.state.otherRoutes
        });
    }

    onCloseModalHandler = (): void => {
        this.setState({
            ...this.state,
            showModal: false
        });
    }

    render(): JSX.Element {
        let modalContent: JSX.Element | null = null;

        if (this.state.showModal && this.state.modalContent.length > 0) {
            modalContent = <div>CONTENT</div>
        }

        return (
            <Fragment>
                <Modal show={this.state.showModal} onClose={this.onCloseModalHandler} >
                    {modalContent}
                </Modal>
                <TwoWayRoute 
                    cityOne={this.state.cityOne}
                    cityTwo={this.state.cityTwo}
                    routesLength={this.props.game?.getCurrentPlayer().getRoutes().length || 0}
                    otherRoutesLength={this.state.otherRoutes.length}
                    whenClickOrigin={this.onOriginChangeHandler}
                    whenClickDestination={this.onDestinationChangeHandler}
                />
            </Fragment>
        );
    }
}


const mapStateToProps = (state: INardisState): INewRouteProps => ({
    game: state._game
});


export default connect(mapStateToProps)(NewRoute);