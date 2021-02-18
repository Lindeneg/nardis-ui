import { Route, QueuedRouteItem, Upgrade, Player, Nardis } from 'nardis-game';

import { 
    GetAllPlayers,
    GetAllResources, 
    GetAllStock, 
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
    avgExpense        : number,
    netWorth          : number,
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
    getAllStock       : GetAllStock,
    getAllPlayers     : GetAllPlayers,
    getTotalProfits   : GetTotalProfits
};


export default NardisState;