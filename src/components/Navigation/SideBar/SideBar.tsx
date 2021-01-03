import { Fragment } from 'react';
 
import NavigationEntries from '../NavigationEntries/NavigationEntries';
import Backdrop from '../../Utility/Backdrop/Backdrop';
import Styles from './SideBar.module.css';
import { mainNavigationBarEntries } from '../../../common/constants';
import { Clickable, Functional, OnClickFunc, Props } from '../../../common/props';


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
        <div className={[Styles.SideBar, props.show ? Styles.Open : Styles.Close].join(' ')}>
            <nav>
                <NavigationEntries {...mainNavigationBarEntries} />
            </nav>
        </div>
    </Fragment>
);


export default sideBar;