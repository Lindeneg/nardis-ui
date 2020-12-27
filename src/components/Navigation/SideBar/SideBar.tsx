import { Fragment } from 'react';
 
import NavigationEntries from '../NavigationEntries/NavigationEntries';
import Backdrop from '../../Utility/Backdrop/Backdrop';
import { mainNavigationBarEntries } from '../../../common/constants';
import { Clickable, Functional, OnClickFunc, Props } from '../../../common/props';
import styles from './SideBar.module.css';


interface SideBarProps extends Props, Clickable<OnClickFunc> {
    show: boolean
};


/**
 * SideBar is a component suitable for showing the menu entries for a mobile device.
 */
const sideBar: Functional<SideBarProps> = (
    props: SideBarProps
): JSX.Element => (
    <Fragment>
        <Backdrop {...props} />
        <div className={[styles.SideBar, props.show ? styles.Open : styles.Close].join(' ')}>
            <nav>
                <NavigationEntries {...mainNavigationBarEntries} />
            </nav>
        </div>
    </Fragment>
);


export default sideBar;