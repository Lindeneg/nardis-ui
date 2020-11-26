import NavigationEntry from './NavigationEntry/NavigationEntry';

import styles from './NavigationEntries.module.css';

// TODO add end turn button, take function as prop

/**
 * Wrapper to capture a list of NavigationEntry components.
 */

const navigationEntries = (props: any) => (
    <ul className={styles.NavigationEntries}>
        <NavigationEntry link="/" active exact>
            MANAGEMENT
        </NavigationEntry>
        <NavigationEntry link="/finance">
            FINANCE
        </NavigationEntry>
        <NavigationEntry link="/resources">
            RESOURCES
        </NavigationEntry>
        <NavigationEntry link="/opponents">
            OPPONENTS
        </NavigationEntry>
        <button >END TURN</button>
    </ul>
);


export default navigationEntries;