import { 
    FinanceHistory, 
    FinanceTotal, 
    LocalKey, 
    localKeys, 
    Nardis, 
    Player,
    City,
    Finance,
    Stocks
} from 'nardis-game';

import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';


function getArr<T>(t: T): T[] {
    return [t];
}

const hasLocal = (): boolean => {
    let result: boolean;
    try {
        result = !!window.localStorage[localKeys[LocalKey.HasActiveGame]];
    } catch (err) {
        process.env.NODE_ENV !== "production" && console.error(err);
        result = false;
    }
    return result;
}


const initialize: ActionFunc = (
    args: ActionFuncArgs
): NardisState => {
    if (args.payload.initGame) {
        let game: Nardis;
        if (hasLocal()) {
            game = Nardis.createFromLocalStorage();
        } else {
            game = Nardis.createFromPlayer(args.payload.initGame.name, args.payload.initGame.money, args.payload.initGame.opponents);
        }
        const player : Player = game.getCurrentPlayer();
        const finance: Finance = player.getFinance();
        return {
            _game             : game,
            gameCreated       : true,
            isLoading         : false,
            money             : finance.getGold(),
            turn              : game.getCurrentTurn(),
            level             : player.getLevel(),
            range             : player.getRange(),
            avgRevenue        : finance.getAverageRevenue(),
            avgExpense        : finance.getAverageExpense(),
            netWorth          : finance.getNetWorth(),
            startGold         : player.startGold,
            routes            : player.getRoutes(),
            queue             : player.getQueue(),
            upgrades          : player.getUpgrades(),
            opponents         : game.players.filter(e => e.id !== player.id),

            getPotentialRoutes: game.getArrayOfPossibleRoutes,
            getPossibleTrains : game.getArrayOfAdjustedTrains,
            getAllResources   : () => game.data.resources,
            getAllUpgrades    : () => game.data.upgrades,
            getTotalProfits   : () => finance.getTotalProfits(),
            getFinanceHistory : () => getArr<FinanceHistory>(finance.getHistory()),
            getAllStock       : () => getArr<Stocks>(game.stocks),
            getGameStatus     : () => game.getGameStatus(),
            getAllPlayers     : () => game.players,
            getStartCity      : () => getArr<City>(player.getStartCity()),
            getFinanceTotal   : () => getArr<FinanceTotal>(finance.getTotalHistory()),
        };
    }
    console.error('invalid initialize payload');
    return args.state;
};


export default initialize;