import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { City, Nardis, PotentialRoute, Resource, RouteCargo, RoutePlanCargo, Train } from 'nardis-game';

import Modal from '../../../components/Utility/Modal/Modal';
import { INardisState } from '../../../common/state';
import { ButtonType } from '../../../components/Utility/Button/buttonType';
import ListItems from '../../../components/Information/ListItems/ListItems';
import { ListType } from '../../../components/Information/ListItems/listType';
import Overview from './Helpers/Overview/Overview';
import CitySelector, { SelectorProp } from './Helpers/Selector/CitySelector';
import CargoSelector from './Helpers/Selector/CargoSelector';
import { getCargoCards } from './Helpers/Selector/getCargoCards';
import { PossibleTrain, RouteRevolution } from '../../../common/constants';


// State

export interface ChosenTrain {
    train: Train | null,
    cost: number | null,
    routePlanCargo: RoutePlanCargo | null
};

export type CargoChange = (resource: Resource, revolution: RouteRevolution) => void;

interface NewRouteModal {
    show: boolean,
    type: ListType | null
};

interface NewRouteState {
    startCity: City | null,
    chosenTrain: ChosenTrain,
    chosenRoute: PotentialRoute[],
    otherRoutes: PotentialRoute[],
    possibleTrains: PossibleTrain[],
    modal: NewRouteModal
};

// Props

interface RouteInfo {
    routes: PotentialRoute[], 
    otherRoutes: PotentialRoute[], 
    trains: PossibleTrain[]
};

interface NewRouteProps {
    game: Nardis | undefined
}


/**
 * 
 */
class NewRoute extends Component<NewRouteProps, NewRouteState> {

    state: NewRouteState = {
        startCity: null,
        chosenTrain: {
            train: null,
            cost: null,
            routePlanCargo: null
        },
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
            const train: PossibleTrain = possibleRoutes.trains[0];
            if (possibleRoutes.routes.length > 0 /* && 1 > 2 */) {
                this.setState({
                    ...this.state,
                    startCity,
                    chosenRoute: [possibleRoutes.routes[0]],
                    chosenTrain: {...train, routePlanCargo: null},
                    otherRoutes: possibleRoutes.otherRoutes,
                    possibleTrains: possibleRoutes.trains.filter(e => e.train.id !== train.train.id)
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
        if (this.state.chosenTrain && this.state.chosenTrain.train && this.state.chosenTrain.cost) {
            possibleTrains.push({train: this.state.chosenTrain.train, cost: this.state.chosenTrain.cost});
        }
        this.setState({
            ...this.state,
            possibleTrains: [...possibleTrains]
            .filter(e => e.train.id !== trainId)
            .sort((a, b) => (a.train.levelRequired - b.train.levelRequired) - (b.cost - a.cost)),
            chosenTrain: {
                train: train.train,
                cost: train.cost,
                routePlanCargo: null
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
            chosenTrain: {
                ...this.state.chosenTrain,
                routePlanCargo: null
            },
            otherRoutes,
            chosenRoute,
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

    onCargoAdd: CargoChange = (resource: Resource, revolution: RouteRevolution): void => {
        const cityOne = [...this.state.chosenTrain.routePlanCargo?.cityOne || []];
        const cityTwo = [...this.state.chosenTrain.routePlanCargo?.cityTwo || []];
        const targetCity = revolution === RouteRevolution.NONE ? cityOne : cityTwo;
        const targetResource = targetCity.filter(target => target.resource.equals(resource));

        if (targetResource.length > 0) {
            targetResource[0].targetAmount++;
        } else {
            targetCity.push({
                resource,
                actualAmount: 0,
                targetAmount: 1
            });
        }

        this.setState({
            ...this.state,
            chosenTrain: {
                ...this.state.chosenTrain,
                routePlanCargo: {
                    cityOne,
                    cityTwo
                }
            }
        });
    }

    onCargoRemove: CargoChange = (resource: Resource, revolution: RouteRevolution): void => {
        const cityOne = [...this.state.chosenTrain.routePlanCargo?.cityOne || []];
        const cityTwo = [...this.state.chosenTrain.routePlanCargo?.cityTwo || []];
        const targetCity = revolution === RouteRevolution.NONE ? cityOne : cityTwo;

        for (let i = 0; i < targetCity.length; i++) {
            if (targetCity[i].resource.equals(resource)) {
                if (targetCity[i].targetAmount - 1 <= 0) {
                    targetCity.splice(i, 1);
                } else {
                    targetCity[i].targetAmount--;
                }
            }
        }

        this.setState({
            ...this.state,
            chosenTrain: {
                ...this.state.chosenTrain,
                routePlanCargo: {
                    cityOne,
                    cityTwo
                }
            }
        });
    }

    onRouteBuy = () => {
        console.log("BUY");
        console.log(this.state);
    }

    getSelectorButtonProps = (): SelectorProp[] => [
        {
            props: {
                disabled: (this.props.game?.getCurrentPlayer().getRoutes().length || 0) <= 0,
                whenClicked: this.onOriginChange,
                buttonType: ButtonType.CHANGE_ORIGIN
            },
            content: 'CHANGE ORIGIN'
        },
        {
            props: {
                disabled: this.state.otherRoutes.length <= 0,
                whenClicked: this.onDestinationChange,
                buttonType: ButtonType.CHANGE_DESTINATION
            },
            content: 'CHANGE DESTINATION'
        }
    ];

    getCargoSelector = (): JSX.Element | null => {
        const cityOneCargo: RouteCargo[] = this.state.chosenTrain.routePlanCargo?.cityOne || [];
        const cityTwoCargo:  RouteCargo[] = this.state.chosenTrain.routePlanCargo?.cityTwo || [];
        const availableCargo: number = this.state.chosenTrain.train?.cargoSpace || 0;
        const cards = getCargoCards(cityOneCargo, cityTwoCargo, this.state.chosenRoute, availableCargo, this.onCargoAdd, this.onCargoRemove);

        let jsx: JSX.Element | null = null;

        if (cards.first !== null && cards.second !== null) {
            jsx = <CargoSelector 
                first={{...cards.first}}
                second={{...cards.second}}
                changeTrainButton={{disabled: false, whenClicked: this.onSetTrainChange, buttonType: ButtonType.SET_TRAIN}}
                buyRouteButton={{disabled: false, whenClicked: this.onRouteBuy, buttonType: ButtonType.BUY_ROUTE}}
            />
        }
        return jsx;
    }

    render(): JSX.Element {
        let modalContent: JSX.Element | null = null;
        // TODO redo or outsource this
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
                <Modal show={this.state.modal.show} whenClicked={this.onCloseModalHandler} >
                    {modalContent}
                </Modal>
                <hr/>
                <CitySelector buttons={this.getSelectorButtonProps()} />
                <hr/>
                <Overview 
                    chosenRoute={this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0] : null}
                    chosenTrain={this.state.chosenTrain}
                    startCity={this.state.startCity} 
                />
                {this.getCargoSelector()}
            </Fragment>
        );
    }
}


const mapStateToProps = (state: INardisState): NewRouteProps => ({
    game: state._game
});


export default connect(mapStateToProps)(NewRoute);