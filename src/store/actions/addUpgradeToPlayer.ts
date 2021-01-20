import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';
import update from './update';


const addUpgradeToPlayer: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    let state: NardisState = {...args.state};
    if (args.state.gameCreated && args.state._game && args.payload.addUpgradeToPlayer) {
        args.state._game.addUpgradeToPlayer(args.payload.addUpgradeToPlayer.upgradeId);
        state = {...update({state, payload: {}})};
    }
    return state;
};


export default addUpgradeToPlayer;