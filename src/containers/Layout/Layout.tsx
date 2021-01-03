import { Component, CSSProperties, Fragment, ReactNode } from 'react';
import { connect } from 'react-redux';

import Navigation from '../../components/Navigation/Navigation';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import Cards from '../../components/Information/Cards/Cards';
import CreateGame from '../CreateGame/CreateGame';
import Spinner from '../../components/Utility/Spinner/Spinner';
import Styles from './Layout.module.css';
import { NardisState } from '../../common/state';
import { layoutCardLabels } from '../../common/constants';
import { Indexable, MapState, Props } from '../../common/props';


interface LayoutState {
    showSideBar: boolean
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
    opponents  : number
};

type Union = number | string | CSSProperties | ReactNode;

interface LayoutProps extends Props, LayoutMappedProps, Indexable<Union> {};


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
});


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
                    {!this.props.isLoading ?
                    <div>
                        <Navigation whenClicked={this.toggleSideBarHandler} />
                        <SideBar show={this.state.showSideBar} whenClicked={this.closeSideBarHandler} />
                        <Cards cards={playerCards} />
                        <main className={Styles.Content}>
                            {this.props.children}
                        </main>
                        <footer>Footer</footer>
                    </div> : <Spinner redirectTo="/finance"/>}
                </Fragment>
            );
        }
        return jsx;
    }
}


export default connect(mapStateToProps)(Layout);