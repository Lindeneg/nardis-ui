import { Nardis, Train } from "nardis-game";
import { PotentialRoute } from 'nardis-game';


export interface PossibleTrain {
    train: Train,
    cost: number
}

export interface RouteInfo {
    routes: PotentialRoute[], 
    otherRoutes: PotentialRoute[], 
    trains: PossibleTrain[]
};

export default interface INewRouteProps {
    game: Nardis | undefined
}