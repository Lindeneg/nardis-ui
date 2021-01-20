import { Player } from 'nardis-game';
import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';



const update: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    if (args.state.gameCreated && args.state._game) {
        const player: Player = args.state._game.getCurrentPlayer();
        return {
            ...args.state,
            money     : player.getFinance().getGold(),
            turn      : args.state._game.getCurrentTurn(),
            level     : player.getLevel(),
            range     : player.getRange(),
            avgRevenue: player.getFinance().getAverageRevenue(),
            routes    : player.getRoutes(),
            queue     : player.getQueue(),
            upgrades  : player.getUpgrades(),
        };
    }
    console.error('invalid update state');
    return args.state;
};


export default update;