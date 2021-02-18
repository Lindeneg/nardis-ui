import { 
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


const initialState: NardisState = {
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
    getTotalProfits   : () => 0
};

const reducer = (
    state : NardisState = initialState, 
    action: ReducerAction
): NardisState => {
    let returnFunc: ActionFunc = (args: ActionFuncArgs) => state;
    switch (action.type) {
        case NardisAction.INITIALIZE_GAME:
            returnFunc = initialize;
            break;
        case NardisAction.START_PLAYER_TURN:
            break;
        case NardisAction.ADD_TO_PLAYER_QUEUE:
            returnFunc = addToPlayerQueue;
            break;
        case NardisAction.ADD_PLAYER_UPGRADE:
            returnFunc = addUpgradeToPlayer;
            break;
        case NardisAction.REMOVE_FROM_PLAYER_QUEUE:
            returnFunc = removeFromPlayerQueue;
            break;
        case NardisAction.REMOVE_FROM_PLAYER_ROUTE:
            returnFunc = removeRouteFromRoutes;
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
        default:
            break;
    }
    return returnFunc({state, payload: action.payload});
}


export default reducer;