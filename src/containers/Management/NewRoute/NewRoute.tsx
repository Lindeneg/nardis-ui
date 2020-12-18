import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { City, PotentialRoute } from 'nardis-game';
import RouteSummary from '../../../components/Information/MetaRoute/RouteSummary/RouteSummary';
import TwoWayRoute from '../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import Modal from '../../../components/Utility/Modal/Modal';
import { INardisState } from '../../../common/state';
import INewRouteProps, { PossibleTrain, RouteInfo } from './NewRoute.props';
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
        modal: {
            show: false,
            type: null
        }
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
                result.trains = this.props.game.getArrayOfAdjustedTrains()
                .sort((a, b) => a.train.levelRequired - b.train.levelRequired);
            }
        }
        return result;
    }

    onOriginChange = (): void => {
        console.log("change origin");
    }

    onDestinationChange = (): void => {
        this.setState({
            ...this.state,
            modal: {
                show: true,
                type: ListType.POTENTIAL_ROUTE_DESTINATION
            }
        });
    }

    onSetTrainChange = (): void => {
        this.setState({
            ...this.state,
            modal: {
                show: true,
                type: ListType.POTENTIAL_ROUTE_TRAIN
            }
        })
    }

    trainChangeHandler = (trainId: string): void => {
        const train: PossibleTrain = this.state.possibleTrains.filter(e => e.train.id === trainId)[0];
        const possibleTrains: PossibleTrain[] = [...this.state.possibleTrains];
        if (this.state.chosenTrain && this.state.chosenTrain.train && this.state.chosenTrain.trainCost) {
            possibleTrains.push({train: this.state.chosenTrain.train, cost: this.state.chosenTrain.trainCost});
        }
        this.setState({
            ...this.state,
            possibleTrains: [...possibleTrains]
            .filter(e => e.train.id !== trainId)
            .sort((a, b) => (a.train.levelRequired - b.train.levelRequired) - (b.cost - a.cost)),
            chosenTrain: {
                train: train.train,
                trainCost: train.cost
            },
            modal: {
                show: false,
                type: null
            }
        })
    }

    destinationChangeHandler = (cityId: string): void => {
        const chosenRoute = this.state.otherRoutes.filter(e => e.cityTwo.id === cityId);
        const otherRoutes = [
            ...this.state.otherRoutes, 
            ...this.state.chosenRoute
        ]
        .filter(e => e.cityTwo.id !== cityId)
        .sort((a, b) => a.distance - b.distance);

        this.setState({
            ...this.state,
            otherRoutes,
            chosenRoute,
            chosenTrain: null,
            modal: {
                show: false,
                type: null
            }
        });
    }

    onCloseModalHandler = (): void => {
        this.setState({
            ...this.state,
            modal: {
                show: false,
                type: null
            }
        });
    }

    render(): JSX.Element {
        let modalContent: JSX.Element | null = null;
        if (this.state.modal.show) {
            switch (this.state.modal.type) {
                case ListType.POTENTIAL_ROUTE_DESTINATION:
                    if (this.state.otherRoutes.length > 0) {
                        modalContent = (
                            <ListItems 
                                listType={ListType.POTENTIAL_ROUTE_DESTINATION}
                                whenClicked={this.destinationChangeHandler} 
                                content={{potentialRoutes: this.state.otherRoutes}} 
                            />
                        )
                    }
                    break;
                case ListType.POTENTIAL_ROUTE_ORIGIN:
                    break;
                case ListType.POTENTIAL_ROUTE_TRAIN:
                    if (this.state.possibleTrains.length > 0) {
                        modalContent = (
                            <ListItems 
                                listType={ListType.POTENTIAL_ROUTE_TRAIN}
                                whenClicked={this.trainChangeHandler} 
                                content={{possibleTrains: this.state.possibleTrains}} 
                            />
                        )
                    }
                    break;
                default:
                    break;
            }
        }
        return (
            <Fragment>
                <Modal show={this.state.modal.show} onClose={this.onCloseModalHandler} >
                    {modalContent}
                </Modal>
                {this.state.chosenRoute.length > 0 && 1 > 2 ? 
                <RouteSummary 
                    distance={this.state.chosenRoute[0].distance} 
                    goldCost={this.state.chosenRoute[0].goldCost} 
                    turnCost={this.state.chosenRoute[0].turnCost} /> 
                    : null}
                <hr/>
                <Button 
                    disabled={(this.props.game?.getCurrentPlayer().getRoutes().length || 0) <= 0} 
                    whenClicked={this.onOriginChange} 
                    buttonType={ButtonType.CHANGE_ORIGIN}
                    style={{marginTop: '5px'}}>
                        CHANGE ORIGIN
                </Button>
                <Button 
                    disabled={this.state.otherRoutes.length <= 0} 
                    whenClicked={this.onDestinationChange} 
                    buttonType={ButtonType.CHANGE_DESTINATION}
                    style={{marginTop: '5px'}}>
                        CHANGE DESTINATION
                </Button>
                <hr/>
                <TwoWayRoute 
                    cityOne={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0].cityOne : this.state.startCity}
                    cityTwo={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0].cityTwo : null}
                />
                <Button 
                    disabled={false} 
                    whenClicked={this.onSetTrainChange} 
                    buttonType={ButtonType.SET_TRAIN}>
                        CHANGE TRAIN
                </Button>
            </Fragment>
        );
    }
}


const mapStateToProps = (state: INardisState): INewRouteProps => ({
    game: state._game
});


export default connect(mapStateToProps)(NewRoute);