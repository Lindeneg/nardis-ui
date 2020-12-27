import { Component, CSSProperties, Fragment, ReactNode } from 'react';
import { connect } from 'react-redux';

import Navigation from '../../components/Navigation/Navigation';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import Cards from '../../components/Information/Cards/Cards';
import CreateGame from '../CreateGame/CreateGame';
import { INardisState } from '../../common/state';
import { layoutCardLabels } from '../../common/constants';
import { Indexable, MapState, Props } from '../../common/props';
import styles from './Layout.module.css';


interface LayoutState {
    showSideBar: boolean
};

interface LayoutMappedProps {
    gameCreated: boolean,
    money      : number,
    level      : number,
    turn       : number,
    range      : number,
    routes     : number,
    queue      : number,
    opponents  : number
};

type Union = number | string | CSSProperties | ReactNode;

interface LayoutProps extends Props, LayoutMappedProps, Indexable<Union> {};


/**
 * Layout contains navigational related components and should be present on all routes.
 * 
 * If no game has created yet, Layout instead routes to /create-game for creation.
 */
class Layout extends Component<LayoutProps, LayoutState> {

    state: LayoutState = {
        showSideBar: false
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

    render (): JSX.Element {

        let jsx: JSX.Element = <CreateGame />

        if (this.props.gameCreated) {
            const playerCards = layoutCardLabels.map(cards => {
                const [label, suffix] = cards;
                return {
                    label,
                    value: (this.props[label]?.toString() || '') + suffix
                };
            });
            jsx = (
                <Fragment>
                    <Navigation whenClicked={this.toggleSideBarHandler} />
                    <SideBar show={this.state.showSideBar} whenClicked={this.closeSideBarHandler} />
                    <Cards cards={playerCards} />
                    <main className={styles.Content}>
                        {this.props.children}
                    </main>
                    <footer>Footer</footer>
                </Fragment>
            );
        }
        return jsx;
    }
}


const mapStateToProps: MapState<INardisState, LayoutMappedProps> = (
    state: INardisState
): LayoutMappedProps => ({
    gameCreated: state.gameCreated,
    money      : state.money,
    level      : state.level,
    turn       : state.turn,
    range      : state.range,
    routes     : state.routes.length,
    queue      : state.queue.length,
    opponents  : state.opponents.length,
});


export default connect(mapStateToProps)(Layout);