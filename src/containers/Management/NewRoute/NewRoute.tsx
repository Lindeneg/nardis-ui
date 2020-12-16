import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { City, PotentialRoute } from 'nardis-game';
import TwoWayRoute from '../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import PotentialRoutes from '../../../components/Information/MetaRoute/PotentialRoutes/PotentialRoutes';
import Modal from '../../../components/Utility/Modal/Modal';
import { INardisState } from '../../../common/state';
import INewRouteProps, { RouteInfo } from './NewRoute.props';
import INewRouteState from './NewRoute.state';


class NewRoute extends Component<INewRouteProps> {

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
                <PotentialRoutes 
                    whenClicked={this.destinationChangeHandler} 
                    potentialRoutes={this.state.modalContent} 
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
                <TwoWayRoute 
                    cityOne={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0].cityOne : this.state.startCity}
                    cityTwo={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0].cityTwo : null}
                    routesLength={this.props.game?.getCurrentPlayer().getRoutes().length || 0}
                    otherRoutesLength={this.state.otherRoutes.length}
                    whenClickOrigin={this.onOriginChangeHandler}
                    whenClickDestination={this.onDestinationChangeHandler}
                />
                {this.state.chosenRoute.length > 0 ? 
                <div>
                    <ul>
                        <li>
                            Distance: {distance}km
                        </li>
                        <li>
                            Gold Cost: {goldCost}g
                        </li>
                        <li>
                            Turn Cost: {turnCost}t
                        </li>
                    </ul>
                    <button>SET TRAIN</button>
                </div> : null}
            </Fragment>
        );
    }
}


const mapStateToProps = (state: INardisState): INewRouteProps => ({
    game: state._game
});


export default connect(mapStateToProps)(NewRoute);