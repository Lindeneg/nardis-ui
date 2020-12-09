import { Nardis, Player } from 'nardis-game';
import { INardisState, IReducerPayload } from '../common/state';


const initialize = (state: INardisState, payload: IReducerPayload): INardisState => {
    if (payload.initGame) {
        const game: Nardis = Nardis.createFromPlayer(payload.initGame.name);
        const player: Player = game.getCurrentPlayer();
        return {
            gameCreated: true,
            money      : player.gold,
            turn       : game.getCurrentTurn(),
            level      : player.getLevel(),
            routes     : player.getRoutes(),
            queue      : player.getQueue(),
            upgrades   : player.getUpgrades(),
            opponents  : game.players.filter(e => e.id !== player.id)
        };
    }
    console.error('invalid initialize payload');
    return state;
};

export default initialize;