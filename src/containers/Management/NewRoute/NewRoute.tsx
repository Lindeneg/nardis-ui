import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { City, PotentialRoute } from 'nardis-game';
import RouteSummary from '../../../components/Information/MetaRoute/RouteSummary/RouteSummary';
import TwoWayRoute from '../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import Modal from '../../../components/Utility/Modal/Modal';
import { INardisState } from '../../../common/state';
import INewRouteProps, { RouteInfo } from './NewRoute.props';
import INewRouteState from './NewRoute.state';
import Button from '../../../components/Utility/Button/Button';
import { ButtonType } from '../../../components/Utility/Button/buttonType';
import ListItems from '../../../components/Information/ListItems/ListItems';
import { ListType } from '../../../components/Information/ListItems/listType';


class NewRoute extends Component<INewRouteProps, INewRouteState> {

    state: INewRouteState = {
        startCity: null,
        chosenTrain: null,
        chosenRoute: [],
        otherRoutes: [],
        possibleTrains: [],
        showModal: false,
        modalContent: []
    };

    componentDidMount = (): void => {
        if (!this.state.startCity && this.props.game) {
            const startCity: City = this.props.game.getCurrentPlayer().getStartCity();
            const possibleRoutes: RouteInfo = this.getPossibleRouteInfo(startCity);
            if (possibleRoutes.routes.length > 0) {
                this.setState({
                    ...this.state,
                    chosenRoute: [possibleRoutes.routes[0]],
                    otherRoutes: possibleRoutes.otherRoutes,
                    possibleTrains: possibleRoutes.trains
                });
            } else {
                this.setState({
                    ...this.state,
                    startCity
                });
            }
        }
    }

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
            modalContent: [...this.state.otherRoutes]
        });
    }

    destinationChangeHandler = (cityId: string): void => {
        const otherRoutes = [
            ...this.state.otherRoutes, 
            ...this.state.chosenRoute
        ]
        .filter(e => e.cityTwo.id !== cityId)
        .sort((a, b) => a.distance - b.distance);
        const chosenRoute = this.state.otherRoutes.filter(e => e.cityTwo.id === cityId);
        this.setState({
            ...this.state,
            otherRoutes,
            chosenRoute,
            chosenTrain: null,
            showModal: false
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
        let [distance, goldCost, turnCost]: [number, number, number] = [0, 0, 0];
        if (this.state.showModal && this.state.modalContent.length > 0) {
            modalContent = (
                <ListItems 
                    listType={ListType.POTENTIAL_ROUTE_DESTINATION}
                    whenClicked={this.destinationChangeHandler} 
                    content={{potentialRoutes: this.state.modalContent}} 
                />
            );
        }

        if (this.state.chosenRoute.length > 0) {
            const route: PotentialRoute = this.state.chosenRoute[0];
            [distance, goldCost, turnCost] = [route.distance, route.goldCost, route.turnCost]; 
        }

        return (
            <Fragment>
                <Modal show={this.state.showModal} onClose={this.onCloseModalHandler} >
                    {modalContent}
                </Modal>
                {this.state.chosenRoute.length > 0 ? 
                <RouteSummary distance={distance} goldCost={goldCost} turnCost={turnCost} /> : null}
                <TwoWayRoute 
                    cityOne={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0].cityOne : this.state.startCity}
                    cityTwo={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0].cityTwo : null}
                    routesLength={this.props.game?.getCurrentPlayer().getRoutes().length || 0}
                    otherRoutesLength={this.state.otherRoutes.length}
                    whenClickOrigin={this.onOriginChangeHandler}
                    whenClickDestination={this.onDestinationChangeHandler}
                />
                {!this.state.chosenTrain ? 
                <Button 
                    disabled={false} 
                    whenClicked={() => null} 
                    buttonType={ButtonType.SET_TRAIN}>
                        CHOOSE TRAIN
                </Button> : null}
            </Fragment>
        );
    }
}


const mapStateToProps = (state: INardisState): INewRouteProps => ({
    game: state._game
});


export default connect(mapStateToProps)(NewRoute);