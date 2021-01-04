import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const removeRouteFromRoutes: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.removeRouteFromRoutes) {
        args.state._game.removeRouteFromPlayerRoutes(args.payload.removeRouteFromRoutes.routeId);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default removeRouteFromRoutes;