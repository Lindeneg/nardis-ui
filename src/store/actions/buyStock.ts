import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const buyStock: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.buyStock) {
        args.state._game.buyStock(args.payload.buyStock.playerId);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default buyStock;