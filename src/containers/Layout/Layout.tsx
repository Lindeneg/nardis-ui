import { Component, CSSProperties, Fragment, ReactNode } from 'react';
import { connect } from 'react-redux';

import { GameStatus, Player } from 'nardis-game';

import Navigation from '../../components/Navigation/Navigation';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import Cards from '../../components/Information/Cards/Cards';
import CreateGame from '../CreateGame/CreateGame';
import EndedGame from '../CreateGame/EndedGame/EndedGame';
import Spinner from '../../components/Utility/Spinner/Spinner';
import Styles from './Layout.module.css';
import { NardisState } from '../../common/state';
import { NardisAction } from '../../common/actions';
import { getPlayerIndexFromPlayerId } from '../Opponents/Opponents';
import { layoutCardLabels } from '../../common/constants';
import { 
    Indexable, 
    MapDispatch, 
    MapState, 
    OnDispatch, 
    Props 
} from '../../common/props';


interface LayoutState {
    showSideBar: boolean,
    examineEndedGame: boolean
};

interface LayoutDispatchedProps {
    endGame: () => void
};

interface LayoutMappedProps {
    gameCreated: boolean,
    isLoading  : boolean,
    money      : number,
    level      : number,
    turn       : number,
    range      : number,
    routes     : number,
    queue      : number,
    opponents  : number,
    gameStatus : GameStatus,
    players    : Player[]
};

type Union = string | CSSProperties | ReactNode | LayoutDispatchedProps | LayoutMappedProps;

interface LayoutProps extends Props, LayoutMappedProps, LayoutDispatchedProps, Indexable<Union> {};


const mapStateToProps: MapState<NardisState, LayoutMappedProps> = (
    state: NardisState
): LayoutMappedProps => ({
    gameCreated: state.gameCreated,
    isLoading  : state.isLoading,
    money      : state.money,
    level      : state.level,
    turn       : state.turn,
    range      : state.range,
    routes     : state.routes.length,
    queue      : state.queue.length,
    opponents  : state.opponents.length,
    gameStatus : state.getGameStatus(),
    players    : state.getAllPlayers()
});

const mapDispatchToProps: MapDispatch<LayoutDispatchedProps> = (
    dispatch: OnDispatch
): LayoutDispatchedProps => (
    {
        endGame: () => dispatch({
            type: NardisAction.END_CURRENT_GAME,
            payload: {}
        })
    }
);


/**
 * Layout contains navigational related components and should be present on all routes.
 * 
 * If no game has created yet, Layout instead routes to /create-game for creation.
 */
class Layout extends Component<LayoutProps, LayoutState> {

    state: LayoutState = {
        showSideBar: false,
        examineEndedGame: false // false
    };

    closeSideBarHandler = (): void => {
        this.setState({
            ...this.state,
            showSideBar: false
        });
    };

    toggleSideBarHandler = (): void => {
        const showSideBar: boolean = !this.state.showSideBar;
        this.setState({
            ...this.state,
            showSideBar
        });
    };

    onExamineEndedGame = (): void => {
        this.setState({
            ...this.state,
            examineEndedGame: true
        });
    }

    render (): JSX.Element {

        let jsx: JSX.Element = <CreateGame />

        if (this.props.gameCreated) {
            const playerCards = layoutCardLabels.map(cards => {
                const [label, suffix] = cards;
                return {
                    label,
                    value: (this.props[label]?.toLocaleString() || '') + suffix
                };
            });
            jsx = (
                <Fragment>
                    {!this.props.isLoading ?
                    <div>
                        <Navigation whenClicked={this.toggleSideBarHandler} />
                        <SideBar show={this.state.showSideBar} whenClicked={this.closeSideBarHandler} />
                        <Cards cards={playerCards} />
                        <main className={Styles.Content}>
                            {this.props.gameStatus.gameOver && !this.state.examineEndedGame ? (
                                <EndedGame 
                                    examineCallback={this.onExamineEndedGame}
                                    newGameCallback={this.props.endGame}
                                    winningPlayer={this.props.players[getPlayerIndexFromPlayerId(this.props.gameStatus.id, this.props.players)]}
                                />
                            ) : this.props.children}
                        </main>
                        <footer>Footer</footer>
                    </div> : <Spinner />}
                </Fragment>
            );
        }
        return jsx;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Layout);