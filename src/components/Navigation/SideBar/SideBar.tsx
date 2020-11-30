import { Fragment } from 'react';
 
import NavigationEntries from '../NavigationEntries/NavigationEntries';
import Backdrop from '../../../utility/Backdrop/Backdrop';

import SideBarProps from './SideBar.props';

import styles from './SideBar.module.css';


/**
 * SideBar is a component suitable for showing the menu entries for a mobile device.
 */

const sideBar = (props: SideBarProps): JSX.Element => {
    const classes: string[] = [
        styles.SideBar, 
        props.show ? styles.Open : styles.Close
    ];

    return (
        <Fragment>
            <Backdrop clicked={props.onClose} show={props.show} />
            <div className={classes.join(' ')}>
                <nav>
                    <NavigationEntries />
                </nav>
            </div>
        </Fragment>
    );
};


export default sideBar;