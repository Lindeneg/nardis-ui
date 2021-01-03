import { Action } from 'redux';

import { BuyableRoute, City, PotentialRoute, Route } from "nardis-game";

import { Func, PossibleTrain } from "./props";
import { NardisState } from "./state";


/* reducer action types and action functions. */


interface ReducerPayload {
    initGame?: {
        name: string,
        money: number,
        opponents: number
    },
    addToPlayerQueue?: {
        route: BuyableRoute
    },
    removeFromPlayerQueue?: {
        route: Route
    }
};

export enum NardisAction {
    INITIALIZE_GAME,
    START_PLAYER_TURN,
    ADD_TO_PLAYER_QUEUE,
    ADD_PLAYER_UPGRADE,
    REMOVE_FROM_PLAYER_QUEUE,
    REMOVE_FROM_PLAYER_ROUTE,
    UPDATE_PLAYER_VALUES,
    END_PLAYER_TURN,
    TOGGLE_LOADING
};

export interface ActionFuncArgs {
    state: NardisState,
    payload: ReducerPayload
};

export type ActionFunc           = Func<ActionFuncArgs, NardisState>

export type GetStartCity         = Func<void, City[]>;
export type GetPotentialRoutes   = Func<City, PotentialRoute[]>;
export type GetPossibleTrains    = Func<void, PossibleTrain[]>;
export type AddRouteToQueue      = Func<BuyableRoute, void>;
export type RemoveRouteFromQueue = Func<Route, void>;

export interface ReducerAction extends Action<NardisAction> {
    payload: ReducerPayload
};