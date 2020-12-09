import { NoProps } from '../../../common/props';
import NavigationEntry from '../NavigationEntries/NavigationEntry/NavigationEntry';
import styles from '../NavigationEntries/NavigationEntries.module.css';


const managementSelector = (props: NoProps) => (
    <ul style={{height: '60px'}} className={styles.NavigationEntries}>
        <NavigationEntry exact link="/management/new-route"> 
            NEW ROUTE
        </NavigationEntry>
        <NavigationEntry exact link="/management/manage-route"> 
            MANAGE ROUTE
        </NavigationEntry>
        <NavigationEntry exact link="/management/build-queue"> 
            BUILD QUEUE
        </NavigationEntry>
    </ul>
);

export default managementSelector;