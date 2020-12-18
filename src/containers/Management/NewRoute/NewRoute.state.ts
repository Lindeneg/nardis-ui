import { City, PotentialRoute, RoutePlanCargo, Train } from "nardis-game";
import { ListType } from "../../../components/Information/ListItems/listType";
import { PossibleTrain } from './NewRoute.props';


export interface IChosenTrain {
    train: Train,
    trainCost: number,
    routePlanCargo?: RoutePlanCargo
}

export interface INewRouteModal {
    show: boolean,
    type: ListType | null
}

export default interface INewRouteState {
    startCity: City | null,
    chosenTrain: IChosenTrain | null,
    chosenRoute: PotentialRoute[],
    otherRoutes: PotentialRoute[],
    possibleTrains: PossibleTrain[],
    modal: INewRouteModal
}