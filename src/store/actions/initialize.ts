import { City, LocalKey, localKeys, Nardis, Player } from 'nardis-game';

import { NardisState } from '../../common/state';
import { ActionFunc, ActionFuncArgs } from '../../common/actions';


const getStartCities = (city: City): City[] => [city];

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
        const player: Player = game.getCurrentPlayer();
        return {
            _game: game,
            gameCreated: true,
            isLoading  : false,
            money      : player.gold,
            turn       : game.getCurrentTurn(),
            level      : player.getLevel(),
            range      : player.getRange(),
            routes     : player.getRoutes(),
            queue      : player.getQueue(),
            upgrades   : player.getUpgrades(),
            opponents  : game.players.filter(e => e.id !== player.id),

            getStartCity: getStartCities.bind(null, player.getStartCity()),
            getPotentialRoutes: game.getArrayOfPossibleRoutes,
            getPossibleTrains: game.getArrayOfAdjustedTrains,
        };
    }
    console.error('invalid initialize payload');
    return args.state;
};


export default initialize;