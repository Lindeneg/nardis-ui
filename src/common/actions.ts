import { Action } from 'redux';

import { 
    BuyableRoute, 
    FinanceHistory, 
    FinanceTotal, 
    PotentialRoute, 
    Resource, 
    Route,
    City,
    Train,
    RoutePlanCargo,
    Upgrade
} from "nardis-game";

import { Func, PossibleTrain } from "./props";
import { NardisState } from "./state";


interface ReducerPayload {
    initGame?: {
        name: string,
        money: number,
        opponents: number
    },
    addToPlayerQueue?: {
        route: BuyableRoute
    },
    addUpgradeToPlayer?: {
        upgradeId: string
    },
    removeFromPlayerQueue?: {
        route: Route
    },
    removeRouteFromRoutes?: {
        routeId: string,
        value: number
    },
    editActivePlayerRoute?: {
        routeId: string,
        train: Train,
        routePlan: RoutePlanCargo,
        cost: number
    }
};

export enum NardisAction {
    INITIALIZE_GAME,
    START_PLAYER_TURN,
    ADD_TO_PLAYER_QUEUE,
    ADD_PLAYER_UPGRADE,
    REMOVE_FROM_PLAYER_QUEUE,
    REMOVE_FROM_PLAYER_ROUTE,
    EDIT_ACTIVE_PLAYER_ROUTE,
    UPDATE_PLAYER_VALUES,
    END_PLAYER_TURN,
    TOGGLE_LOADING
};

export interface ActionFuncArgs {
    state: NardisState,
    payload: ReducerPayload
};

export type ActionFunc            = Func<ActionFuncArgs, NardisState>
export type GetStartCity          = Func<void, City[]>;
export type GetPotentialRoutes    = Func<City, PotentialRoute[]>;
export type GetPossibleTrains     = Func<void, PossibleTrain[]>;
export type GetFinanceHistory     = Func<void, FinanceHistory[]>;
export type GetFinanceTotal       = Func<void, FinanceTotal[]>;
export type GetTotalProfits       = Func<void, number>;
export type GetAllUpgrades        = Func<void, Upgrade[]>;
export type GetAllResources       = Func<void, Resource[]>;
export type AddRouteToQueue       = Func<BuyableRoute, void>;
export type EditActiveRoute       = (routeId: string, train: Train, routePlan: RoutePlanCargo, cost: number) => void;
export type RemoveRouteFromQueue  = Func<Route, void>;

export interface ReducerAction extends Action<NardisAction> {
    payload: ReducerPayload
};