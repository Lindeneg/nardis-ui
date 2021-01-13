import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { 
    City, PotentialRoute, Resource, RouteCargo, 
    Route, RoutePlanCargo, Train, BuyableRoute 
} from 'nardis-game';

import Overview from './Helpers/Overview/Overview';
import ListItems from '../../../components/Information/ListItems/ListItems';
import CargoSelector from './Helpers/Selector/CargoSelector';
import Modal from '../../../components/Utility/Modal/Modal';
import CitySelector, { SelectorProp } from './Helpers/Selector/CitySelector';
import { NardisState } from '../../../common/state';
import { getCargoCards } from './Helpers/Selector/getCargoCards';
import { RouteRevolution, ListType, ButtonType } from '../../../common/constants';
import { MapDispatch, OnDispatch, Props, PossibleTrain, IdFunc, Func } from '../../../common/props';
import { 
    NardisAction, AddRouteToQueue, GetPossibleTrains, GetPotentialRoutes, GetStartCity 
} from '../../../common/actions';


export type CargoChange = (resource: Resource, revolution: RouteRevolution) => void;

export interface ChosenTrain {
    train             : Train | null,
    cost              : number | null,
    routePlanCargo    : RoutePlanCargo | null
};


interface NewRouteModal {
    show              : boolean,
    type              : ListType | null
};

interface NewRouteState {
    startCity         : City | null,
    chosenTrain       : ChosenTrain,
    chosenRoute       : PotentialRoute[],
    otherRoutes       : PotentialRoute[],
    possibleTrains    : PossibleTrain[],
    modal             : NewRouteModal,
    bought            : boolean
};

interface RouteInfo {
    routes            : PotentialRoute[], 
    trains            : PossibleTrain[]
};

interface MappedProps {
    addToPlayerQueue  : AddRouteToQueue,
};

interface BaseProps {
    routes            : Route[],
    gold              : number,
    getStartCity      : GetStartCity,
    getPotentialRoutes: GetPotentialRoutes,
    getPossibleTrains : GetPossibleTrains
}

interface NewRouteProps extends BaseProps, MappedProps, Props {};


const mapStateToProps = (
    state: NardisState
): BaseProps => ({
    routes            : state.routes,
    gold              : state.money,
    getStartCity      : state.getStartCity,
    getPotentialRoutes: state.getPotentialRoutes,
    getPossibleTrains : state.getPossibleTrains,
});

const mapDispatchToProps: MapDispatch<MappedProps> = (
    dispatch: OnDispatch
): MappedProps => (
    {
        addToPlayerQueue: (route: BuyableRoute) => dispatch(
            {
                type: NardisAction.ADD_TO_PLAYER_QUEUE,
                payload: {
                    addToPlayerQueue: {
                        route
                    }
                }
            }
        )
    }
);


/**
 * Component that is responsible for the creation of new routes between two cities.
 * Lets the player select origin, destination, train and cargo.
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
        },
        bought: false
    };

    componentDidMount = (): void => {
        if (!this.state.startCity && this.state.chosenRoute.length <= 0) {
            const startCity: City = this.props.getStartCity()[0];
            const possibleRoutes: RouteInfo = this.getPossibleRouteInfo(startCity);
            const train: PossibleTrain = possibleRoutes.trains[0];
            if (possibleRoutes.routes.length > 0 /* && 1 > 2 */) {
                this.setState({
                    ...this.state,
                    startCity,
                    chosenRoute: [possibleRoutes.routes[0]],
                    chosenTrain: {...train, routePlanCargo: null},
                    otherRoutes: possibleRoutes.routes,
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

    getPossibleRouteInfo: Func<City, RouteInfo> = (city: City): RouteInfo => {
        const result: RouteInfo = {routes: [], trains: []};
        const routes: PotentialRoute[] = this.props.getPotentialRoutes(city);
        if (routes.length > 0) {
            routes.sort((a, b) => a.distance - b.distance);
            result.routes = routes;
            result.trains = this.props.getPossibleTrains()
            .sort((a, b) => a.train.levelRequired - b.train.levelRequired);
        }
        return result;
    }

    onOriginChange = (): void => {
        this.setState({
            ...this.state,
            modal: {
                show: true,
                type: ListType.Origin
            }
        });
    }

    onDestinationChange = (): void => {
        this.setState({
            ...this.state,
            modal: {
                show: true,
                type: ListType.Destination
            }
        });
    }

    onSetTrainChange = (): void => {
        this.setState({
            ...this.state,
            modal: {
                show: true,
                type: ListType.Train
            }
        })
    }

    trainChangeHandler: IdFunc = (trainId: string): void => {
        const train: PossibleTrain = this.state.possibleTrains.filter(e => e.train.id === trainId)[0];
        const possibleTrains: PossibleTrain[] = [...this.state.possibleTrains];

        this.setState({
            ...this.state,
            possibleTrains: [...possibleTrains]
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

    destinationChangeHandler: IdFunc = (cityId: string): void => {
        const chosenRoute = this.state.otherRoutes.filter(e => e.cityTwo.id === cityId);
        const otherRoutes = [
            ...this.state.otherRoutes, 
        ]
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

    originChangeHandler: IdFunc = (cityId: string): void => {
        const c1 = this.props.routes
        .filter(e => e.getCityTwo().id === cityId);
        const c2 = this.props.routes
        .filter(e => e.getCityOne().id === cityId);
        let city: City | null = null;
        if (c1.length > 0) { city = c1[0].getCityTwo(); }
        if (c2.length > 0) { city = c2[0].getCityOne(); }
        if (city) {
            const info: RouteInfo = this.getPossibleRouteInfo(city);
            const train: PossibleTrain = info.trains[0];
            this.setState({
                ...this.state,
                chosenRoute: [info.routes[0]],
                chosenTrain: {...train, routePlanCargo: null},
                otherRoutes: [...info.routes],
                possibleTrains: [...info.trains],
                modal: {
                    show: false,
                    type: null
                }
            });
        }
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
        const targetCity = revolution === RouteRevolution.NonFull ? cityOne : cityTwo;
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
        const targetCity = revolution === RouteRevolution.NonFull ? cityOne : cityTwo;

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

    onRouteBuy = (): void => {
        let bought: boolean = false;
        if (this.state.chosenRoute.length > 0 && this.state.chosenTrain.train && this.state.chosenTrain.cost) {
            this.props.addToPlayerQueue({
                ...this.state.chosenRoute[0],
                train: this.state.chosenTrain.train,
                trainCost: this.state.chosenTrain.cost,
                routePlanCargo: {
                    cityOne: this.state.chosenTrain.routePlanCargo?.cityOne || [],
                    cityTwo: this.state.chosenTrain.routePlanCargo?.cityTwo || []
                }
            });
            bought = true;
        }
        this.setState({
            ...this.state,
            bought
        });
    }

    getSelectorButtonProps = (): SelectorProp[] => [
        { props: {
            disabled: this.props.routes.length <= 0,
            whenClicked: this.onOriginChange,
            buttonType: ButtonType.ChangeOrigin
        }, content: 'CHANGE ORIGIN'
        },
        { props: {
            disabled: this.state.otherRoutes.length <= 1,
            whenClicked: this.onDestinationChange,
            buttonType: ButtonType.ChangeDestination
        }, content: 'CHANGE DESTINATION'
        }
    ];

    getCargoSelector = (): JSX.Element | null => {
        const route: PotentialRoute | null = this.state.chosenRoute.length > 0 ? this.state.chosenRoute[0] : null;
        const cityOneCargo: RouteCargo[] = this.state.chosenTrain.routePlanCargo?.cityOne || [];
        const cityTwoCargo:  RouteCargo[] = this.state.chosenTrain.routePlanCargo?.cityTwo || [];
        const availableCargo: number = this.state.chosenTrain.train?.cargoSpace || 0;
        const cards = getCargoCards(cityOneCargo, cityTwoCargo, availableCargo, this.onCargoAdd, this.onCargoRemove, this.state.chosenRoute, []);
        const invalid = (
            (route ? route.goldCost : 0) + (this.state.chosenTrain.cost || 0)
        )
        > this.props.gold || (route?.cityOne.isFull() || false) || (route?.cityTwo.isFull() || false);

        let jsx: JSX.Element | null = null;

        if (cards.first !== null && cards.second !== null) {
            jsx = <CargoSelector 
                first={{...cards.first}}
                second={{...cards.second}}
                changeTrainButton={{disabled: false, whenClicked: this.onSetTrainChange, buttonType: ButtonType.SetTrain}}
                buyRouteButton={{disabled: invalid, whenClicked: this.onRouteBuy, buttonType: ButtonType.BuyRoute}}
            />
        }
        return jsx;
    }

    render(): JSX.Element {
        let modalContent: JSX.Element | null = null;
        if (this.state.modal.show) {
            switch (this.state.modal.type) {
                case ListType.Destination:
                    if (this.state.otherRoutes.length > 0) {
                        modalContent = (
                            <ListItems 
                                listType={ListType.Destination}
                                whenClicked={this.destinationChangeHandler} 
                                content={{potentialRoutes: this.state.otherRoutes}} 
                                activeId={this.state.chosenRoute[0].cityTwo.id}
                            />
                        )
                    }
                    break;
                case ListType.Origin:
                    if (this.props.routes.length > 0) {
                        modalContent = (
                            <ListItems 
                                listType={ListType.Origin}
                                whenClicked={this.originChangeHandler} 
                                content={{playerRoutes: this.props.routes}}
                                activeId={this.state.chosenRoute[0].cityOne.id}
                                city={this.props.routes
                                    .filter(e => e.getCityTwo().id === this.state.startCity?.id)
                                    .length > 0 ? null : this.state.startCity}
                            />
                        )
                    }
                    break;
                case ListType.Train:
                    if (this.state.possibleTrains.length > 0) {
                        modalContent = (
                            <ListItems 
                                listType={ListType.Train}
                                whenClicked={this.trainChangeHandler} 
                                content={{possibleTrains: this.state.possibleTrains}}
                                activeId={this.state.chosenTrain.train?.id}
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
                {this.state.bought ? <Redirect to="/management/build-queue" /> : null }
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


export default connect(mapStateToProps, mapDispatchToProps)(NewRoute);