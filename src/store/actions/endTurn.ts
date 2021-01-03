import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const endTurn: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game) {
        args.state._game.endTurn();
        args.state._game.startTurn();
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default endTurn;