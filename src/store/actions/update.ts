import { Finance, Player } from 'nardis-game';
import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';



const update: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    if (args.state.gameCreated && args.state._game) {
        const player: Player = args.state._game.getCurrentPlayer();
        const finance: Finance = player.getFinance();
        return {
            ...args.state,
            money     : finance.getGold(),
            turn      : args.state._game.getCurrentTurn(),
            level     : player.getLevel(),
            range     : player.getRange(),
            avgRevenue: finance.getAverageRevenue(),
            avgExpense: finance.getAverageExpense(),
            netWorth  : finance.getNetWorth(),
            routes    : player.getRoutes(),
            queue     : player.getQueue(),
            upgrades  : player.getUpgrades(),
        };
    }
    console.error('invalid update state');
    return args.state;
};


export default update;