import React, { Component, Fragment } from 'react';

import Navigation from '../../components/Navigation/Navigation';
import SideBar from '../../components/Navigation/SideBar/SideBar';

import styles from './Layout.module.css';

import { 
    LayoutState 
} from '../../types';


/**
 * Layout contains navigational related components and should be present on all routes.
 */

class Layout extends Component {

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