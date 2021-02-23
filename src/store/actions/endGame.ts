import { getDefaultState, NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';


const endGame: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game) {
        args.state._game.clearStorage();
        delete args.state._game;
        state = getDefaultState();
    }
    return state;
};


export default endGame;