import { connect } from 'react-redux';

import { GameStatus } from 'nardis-game';

import NavigationEntry from './NavigationEntry/NavigationEntry';
import Button from '../../Utility/Button/Button';
import Styles from './NavigationEntries.module.css';
import { ButtonType } from '../../../common/constants';
import { NardisAction } from '../../../common/actions';
import { 
    Functional, 
    MapDispatch, 
    MapState, 
    OnDispatch, 
    Props, 
    RouterRouteLinkProps 
} from '../../../common/props';
import NardisState from '../../../common/state';


interface Entry extends RouterRouteLinkProps {
    content            : string
};

interface DispatchedProps {
    endTurn      ?: () => void,
    endGame      ?: () => void,
    toggleLoading?: () => void,
};

interface MappedProps {
    gameStatus?: GameStatus
};

export interface NavigationEntriesProps extends Props, MappedProps, DispatchedProps {
    entries             : Entry[],
    showEndTurnButton   : boolean
};


const onEndGame = (callback: () => void): void => {
    callback();
    window.document.location.pathname = '';
}

const sleep = (ms: number): Promise<any> => {
    if (ms <= 0) { new Promise(() => null); }
    return new Promise(resolve => setTimeout(resolve, ms));
}

const mapStateToProps: MapState<MappedProps> = (
    state: NardisState
): MappedProps => ({
    gameStatus: state.getGameStatus()
});

const mapDispatchToProps: MapDispatch<DispatchedProps> = (
    dispatch: OnDispatch
): DispatchedProps => (
    {
        endTurn: () => dispatch(
            {
                type: NardisAction.END_PLAYER_TURN,
                payload: {}
            }
        ),
        toggleLoading: () => dispatch(
            {
                type: NardisAction.TOGGLE_LOADING,
                payload: {}
            }
        ),
        endGame: () => dispatch({
            type: NardisAction.END_CURRENT_GAME,
            payload: {}
        })
    }
);

/**
 * Wrapper to capture a list of NavigationEntry components.
 */
const navigationEntries: Functional<NavigationEntriesProps> = (
    props: NavigationEntriesProps
): JSX.Element => {
    const gameOver: boolean = props.gameStatus ? props.gameStatus.gameOver : false;
    const btnFunc = async () => {
        if (props.toggleLoading && props.endTurn) {
            const startTime = new Date().getTime();
            props.toggleLoading();
            props.endTurn();
            await sleep(1000 - (new Date().getTime() - startTime));
            props.toggleLoading();

        }
    }
    return (
        <ul style={props.style} className={Styles.NavigationEntries}>
            {props.entries.map((entry: Entry, index: number): JSX.Element => (
                <NavigationEntry 
                    key={index}
                    link={entry.link}
                    style={entry.style}
                    active={entry.active}
                    exact={entry.exact}
                >
                    {entry.content} 
                </NavigationEntry>))}
            {props.showEndTurnButton ?
                <Button 
                    style={{paddingTop: "5px"}} 
                    whenClicked={gameOver && props.endGame ? onEndGame.bind(null, props.endGame) : btnFunc} 
                    disabled={false} 
                    buttonType={ButtonType.EndTurn}
                > 
                       {gameOver ? 'NEW GAME' : 'NEXT TURN'}
                </Button> : null}
        </ul>
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(navigationEntries);