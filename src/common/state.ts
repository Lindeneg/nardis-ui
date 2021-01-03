import { Route, QueuedRouteItem, Upgrade, Player, Nardis } from 'nardis-game';

import { GetPossibleTrains, GetPotentialRoutes, GetStartCity } from './actions';


export interface NardisState {
    _game?: Nardis,
    gameCreated: boolean,
    isLoading: boolean,
    money: number,
    turn: number,
    level: number,
    range: number,
    routes: Route[],
    queue: QueuedRouteItem[],
    upgrades: Upgrade[],
    opponents: Player[],

    getStartCity: GetStartCity
    getPotentialRoutes: GetPotentialRoutes,
    getPossibleTrains: GetPossibleTrains,

};


export default NardisState;