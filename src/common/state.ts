import { Route, QueuedRouteItem, Upgrade, Player, Nardis } from 'nardis-game';

import { 
    GetAllPlayers,
    GetAllResources, 
    GetAllStock, 
    GetAllUpgrades, 
    GetFinanceHistory, 
    GetFinanceTotal, 
    GetGameStatus, 
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
    getGameStatus     : GetGameStatus,
    getAllPlayers     : GetAllPlayers,
    getTotalProfits   : GetTotalProfits
};

export const getDefaultState = (): NardisState => ({
    gameCreated       : false,
    isLoading         : false,
    money             : 0,
    turn              : 0,
    level             : 0,
    range             : 0,
    avgRevenue        : 0,
    avgExpense        : 0,
    netWorth          : 0,
    routes            : [],
    queue             : [],
    upgrades          : [],
    opponents         : [],

    getStartCity      : () => [],
    getPotentialRoutes: () => [],
    getPossibleTrains : () => [],
    getFinanceHistory : () => [],
    getAllResources   : () => [],
    getAllUpgrades    : () => [],
    getAllStock       : () => [],
    getAllPlayers     : () => [],
    getFinanceTotal   : () => [],
    getGameStatus     : () => ({id: '', gameOver: false}),
    getTotalProfits   : () => 0
});


export default NardisState;