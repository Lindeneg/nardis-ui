import { Nardis, Player } from 'nardis-game';
import { NardisState, ReducerPayload } from '../common/state';


const initialize = (state: NardisState, payload: ReducerPayload): NardisState => {
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