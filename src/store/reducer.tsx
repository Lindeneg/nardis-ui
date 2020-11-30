import { 
    NardisAction,
    NardisState, 
    ReducerAction 
} from '../common/state';

import { initialize } from './initialize';

const initialState: NardisState = {
    gameCreated: false,
    money: 1250,
    turn: 52,
    level: 2,
    routes: [],
    queue: [],
    upgrades: [],
    opponents: []
};

const reducer = (state: NardisState = initialState, action: ReducerAction): NardisState => {
    let returnFunc: (state: NardisState, payload: any) => NardisState = (state, payload) => state;
    switch (action.type) {
        case NardisAction.INITIALIZE_GAME:
            returnFunc = initialize;
            break;
        case NardisAction.START_PLAYER_TURN:
            break;
        case NardisAction.ADD_TO_PLAYER_QUEUE:
            break;
        case NardisAction.ADD_PLAYER_UPGRADE:
            break;
        case NardisAction.REMOVE_FROM_PLAYER_QUEUE:
            break;
        case NardisAction.REMOVE_FROM_PLAYER_ROUTE:
            break;
        case NardisAction.END_PLAYER_TURN:
            break;
        default:
            break;
    }
    return returnFunc(state, action.payload);
}


export default reducer;