import React, { Component, Fragment } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import SideBar from '../../components/Navigation/SideBar/SideBar';
import { LayoutState } from '../../types';

import styles from './Layout.module.css';


class Layout extends Component {

    state: LayoutState = {
        showSideBar: false
    };

    /**
     * Close SideBar in a Navigation component.
     */

    closeSideBarHandler = (): void => {
        this.setState({
            ...this.state,
            showSideBar: false
        });
    };

    /**
     * Toggle SideBar in a Navigation component.
     */

    toggleSideBarHandler = (): void => {
        const showSideBar: boolean = !this.state.showSideBar;
        this.setState({
            ...this.state,
            showSideBar
        });
    }

    render() {
        return (
            <Fragment>
                <Navigation clicked={this.toggleSideBarHandler} />
                <SideBar show={this.state.showSideBar} onClose={this.closeSideBarHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;