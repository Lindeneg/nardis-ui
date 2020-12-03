import { Component } from 'react';

import CreateGameState from './CreateGame.state';
import { NoProps } from '../../common/props';



class CreateGame extends Component<NoProps> {

    state: CreateGameState = {
        name: '',
        startMoney: 1000,
        opponents: 4
    }

    render (): JSX.Element {
        return <div>No Game</div>
    };
}

// TODO redirect back to / if state prop "gameActive" is true


export default CreateGame;