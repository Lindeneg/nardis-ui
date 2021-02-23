import { 
    getDefaultState,
    NardisState, 
} from '../common/state';
import { 
    NardisAction,
    ReducerAction,
    ActionFunc,
    ActionFuncArgs
} from '../common/actions';
import update from './actions/update';
import endTurn from './actions/endTurn';
import initialize from './actions/initialize';
import addToPlayerQueue from './actions/addToPlayerQueue';
import removeFromPlayerQueue from './actions/removeFromPlayerQueue';
import removeRouteFromRoutes from './actions/removeRouteFromRoutes';
import editActivePlayerRoute from './actions/editActivePlayerRoute';
import addUpgradeToPlayer from './actions/addUpgradeToPlayer';
import buyStock from './actions/buyStock';
import sellStock from './actions/sellStock';
import buyOutPlayer from './actions/buyoutPlayer';
import endGame from './actions/endGame';


const initialState: NardisState = getDefaultState();

const reducer = (
    state : NardisState = initialState, 
    action: ReducerAction
): NardisState => {
    let returnFunc: ActionFunc = (args: ActionFuncArgs) => state;
    switch (action.type) {
        case NardisAction.INITIALIZE_GAME:
            returnFunc = initialize;
            break;
        case NardisAction.ADD_TO_PLAYER_QUEUE:
            returnFunc = addToPlayerQueue;
            break;
        case NardisAction.ADD_PLAYER_UPGRADE:
            returnFunc = addUpgradeToPlayer;
            break;
        case NardisAction.BUY_STOCK:
            returnFunc = buyStock;
            break;
        case NardisAction.BUY_OUT_PLAYER:
            returnFunc = buyOutPlayer;
            break;
        case NardisAction.REMOVE_FROM_PLAYER_QUEUE:
            returnFunc = removeFromPlayerQueue;
            break;
        case NardisAction.REMOVE_FROM_PLAYER_ROUTE:
            returnFunc = removeRouteFromRoutes;
            break;
        case NardisAction.SELL_STOCK:
            returnFunc = sellStock;
            break;
        case NardisAction.EDIT_ACTIVE_PLAYER_ROUTE:
            returnFunc = editActivePlayerRoute;
            break;
        case NardisAction.UPDATE_PLAYER_VALUES:
            returnFunc = update;
            break;
        case NardisAction.END_PLAYER_TURN:
            returnFunc = endTurn;
            break;
        case NardisAction.TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading
            }
        case NardisAction.END_CURRENT_GAME:
            returnFunc = endGame;
            break;
        default:
            break;
    }
    return returnFunc({state, payload: action.payload});
}


export default reducer;