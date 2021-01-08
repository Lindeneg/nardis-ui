import { 
    FinanceHistory, 
    FinanceTotal, 
    LocalKey, 
    localKeys, 
    Nardis, 
    Player,
    City,
    Finance
} from 'nardis-game';

import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';


function getArr<T>(t: T): T[] {
    return [t];
}


const initialize: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    if (args.payload.initGame) {
        let game: Nardis;
        if (!!window.localStorage[localKeys[LocalKey.HasActiveGame]]) {
            game = Nardis.createFromLocalStorage();
        } else {
            game = Nardis.createFromPlayer(args.payload.initGame.name, args.payload.initGame.money);
        }
        const player : Player = game.getCurrentPlayer();
        const finance: Finance = player.getFinance();
        return {
            _game             : game,
            gameCreated       : true,
            isLoading         : false,
            money             : player.gold,
            turn              : game.getCurrentTurn(),
            level             : player.getLevel(),
            range             : player.getRange(),
            routes            : player.getRoutes(),
            queue             : player.getQueue(),
            upgrades          : player.getUpgrades(),
            opponents         : game.players.filter(e => e.id !== player.id),

            getPotentialRoutes: game.getArrayOfPossibleRoutes,
            getPossibleTrains : game.getArrayOfAdjustedTrains,
            getAllResources   : () => game.data.resources,
            getTotalProfits   : () => finance.getTotalProfits(),
            getFinanceHistory : () => getArr<FinanceHistory>(finance.getHistory()),
            getStartCity      : () => getArr<City>(player.getStartCity()),
            getFinanceTotal   : () => getArr<FinanceTotal>(finance.getTotalHistory()),
        };
    }
    console.error('invalid initialize payload');
    return args.state;
};


export default initialize;