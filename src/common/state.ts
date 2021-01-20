import { Route, QueuedRouteItem, Upgrade, Player, Nardis } from 'nardis-game';

import { 
    GetAllResources, 
    GetAllUpgrades, 
    GetFinanceHistory, 
    GetFinanceTotal, 
    GetPossibleTrains, 
    GetPotentialRoutes, 
    GetStartCity, 
    GetTotalProfits 
} from './actions';


export interface NardisState {
    _game            ?: Nardis,
    gameCreated       : boolean,
    isLoading         : boolean,
    money             : number,
    turn              : number,
    level             : number,
    range             : number,
    avgRevenue        : number,
    routes            : Route[],
    queue             : QueuedRouteItem[],
    upgrades          : Upgrade[],
    opponents         : Player[],

    getStartCity      : GetStartCity
    getPotentialRoutes: GetPotentialRoutes,
    getPossibleTrains : GetPossibleTrains,
    getFinanceHistory : GetFinanceHistory,
    getFinanceTotal   : GetFinanceTotal,
    getAllResources   : GetAllResources,
    getAllUpgrades    : GetAllUpgrades,
    getTotalProfits   : GetTotalProfits
};


export default NardisState;