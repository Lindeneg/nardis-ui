import initialize from './initialize';
import { 
    NardisAction,
    INardisState, 
    IReducerAction, 
    IReducerPayload
} from '../common/state';


const initialState: INardisState = {
    gameCreated: false,
    money      : 0,
    turn       : 0,
    level      : 0,
    range      : 0,
    routes     : [],
    queue      : [],
    upgrades   : [],
    opponents  : []
};

const reducer = (
    state : INardisState = initialState, 
    action: IReducerAction
): INardisState => {
    let returnFunc: (state: INardisState, payload: IReducerPayload) => INardisState = (state, payload) => state;
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