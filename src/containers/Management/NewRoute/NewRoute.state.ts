import { City, PotentialRoute, Train } from "nardis-game";


export default interface INewRouteState {
    cityOne: City | null,
    cityTwo: City | null,
    distance: number,
    purchasedOnTurn: number,
    turnCost: number,
    otherRoutes: PotentialRoute[],
    possibleTrains: {
        train: Train;
        cost: number;
    }[]
}