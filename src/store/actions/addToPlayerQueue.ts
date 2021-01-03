import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const addToPlayerQueue: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.addToPlayerQueue) {
        args.state._game.addRouteToPlayerQueue(args.payload.addToPlayerQueue.route);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default addToPlayerQueue;