import { City, PotentialRoute, RoutePlanCargo, Train } from "nardis-game";
import { PossibleTrain } from './NewRoute.props';


export interface ChosenTrain {
    train: Train,
    trainCost: number,
    routePlanCargo: RoutePlanCargo
}

export default interface INewRouteState {
    startCity: City | null,
    chosenTrain: ChosenTrain | null,
    chosenRoute: PotentialRoute[],
    otherRoutes: PotentialRoute[],
    possibleTrains: PossibleTrain[],
    showModal: boolean,
    modalContent: PotentialRoute[]
}