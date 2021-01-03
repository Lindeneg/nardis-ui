import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';
import { Route } from 'nardis-game';


const removeFromPlayerQueue: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.removeFromPlayerQueue) {
        const route: Route = args.payload.removeFromPlayerQueue.route;
        args.state._game.removeRouteFromPlayerQueue(route.id, route.getTrain().id);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default removeFromPlayerQueue;