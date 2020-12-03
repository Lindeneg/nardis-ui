import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import Navigation from '../../components/Navigation/Navigation';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import Cards from '../../components/Information/Cards/Cards';
import CreateGame from '../CreateGame/CreateGame';

import { NardisState } from '../../common/state';

import LayoutProps, { LayoutMappedProps } from './Layout.props';
import LayoutState from './Layout.state';

import styles from './Layout.module.css';


const cardLabels: string[] = [
    'money',
    'level',
    'routes',
    'queue',
    'opponents',
    'turn'
];


/**
 * Layout contains navigational related components and should be present on all routes.
 * 
 * If no game has created yet, Layout instead routes to /create-game for creation.
 */

class Layout extends Component<LayoutProps> {

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

        let jsx = <CreateGame />

        if (this.props.gameCreated) {
            const playerCards = cardLabels.map(label => {
                return {
                    label,
                    value: this.props[label]?.toString() || ''
                };
            });
            jsx = (
                <Fragment>
                    <Navigation clicked={this.toggleSideBarHandler} />
                    <SideBar show={this.state.showSideBar} onClose={this.closeSideBarHandler} />
                    <Cards cards={playerCards} />
                    <main className={styles.Content}>
                        {this.props.children}
                    </main>
                </Fragment>
            );
        }
        return jsx;
    }
}


const mapStateToProps = (state: NardisState): LayoutMappedProps => ({
    gameCreated: state.gameCreated,
    money: state.money,
    level: state.level,
    turn: state.turn,
    routes: state.routes.length,
    queue: state.queue.length,
    opponents: state.opponents.length,
});


export default connect(mapStateToProps)(Layout);