import { Action } from 'redux';
import { Nardis, Route, QueuedRouteItem, Upgrade, Player } from 'nardis-game';

export enum NardisAction {
    INITIALIZE_GAME,
    START_PLAYER_TURN,
    ADD_TO_PLAYER_QUEUE,
    ADD_PLAYER_UPGRADE,
    REMOVE_FROM_PLAYER_QUEUE,
    REMOVE_FROM_PLAYER_ROUTE,
    END_PLAYER_TURN
}

export interface INardisState {
    _game?: Nardis,
    gameCreated: boolean,
    money: number,
    turn: number,
    level: number,
    range: number,
    routes: Route[],
    queue: QueuedRouteItem[],
    upgrades: Upgrade[],
    opponents: Player[]
}

export interface IReducerPayload {
    initGame?: {
        name: string,
        money: number,
        opponents: number
    }
}

export interface IReducerAction extends Action<NardisAction> {
    payload: IReducerPayload
}

export interface ReducerAction extends Action<NardisAction> {
    payload: IReducerPayload
}
