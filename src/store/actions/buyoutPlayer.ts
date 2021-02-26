import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const buyOutPlayer: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.buyOutPlayer) {
        args.state._game.buyOutPlayer(args.payload.buyOutPlayer.playerId, args.payload.buyOutPlayer.selfBuyOut);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default buyOutPlayer;