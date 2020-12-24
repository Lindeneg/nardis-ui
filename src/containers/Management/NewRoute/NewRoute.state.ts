import { City, PotentialRoute, Resource, RoutePlanCargo, Train } from "nardis-game";
import { ListType } from "../../../components/Information/ListItems/listType";
import { PossibleTrain } from './NewRoute.props';


export interface IChosenTrain {
    train: Train | null,
    cost: number | null,
    routePlanCargo: RoutePlanCargo | null
}

export interface INewRouteModal {
    show: boolean,
    type: ListType | null
}

export enum RouteRevolution {
    NONE,
    SINGLE
}

export type CargoChange = (resource: Resource, revolution: RouteRevolution) => void;

export default interface INewRouteState {
    startCity: City | null,
    chosenTrain: IChosenTrain,
    chosenRoute: PotentialRoute[],
    otherRoutes: PotentialRoute[],
    possibleTrains: PossibleTrain[],
    modal: INewRouteModal
}