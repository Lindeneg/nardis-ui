import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const sellStock: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.sellStock) {
        args.state._game.sellStock(args.payload.sellStock.playerId);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default sellStock;