import { City, PotentialRoute } from "nardis-game";
import { PossibleTrain } from './NewRoute.props';


export default interface INewRouteState {
    cityOne: City | null,
    cityTwo: City | null,
    distance: number,
    purchasedOnTurn: number,
    turnCost: number,
    otherRoutes: PotentialRoute[],
    possibleTrains: PossibleTrain[],
    showModal: boolean,
    modalContent: PotentialRoute[] | PossibleTrain[]
}