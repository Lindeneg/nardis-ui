import NavigationEntry from './NavigationEntry/NavigationEntry';
import styles from './NavigationEntries.module.css';


/**
 * Wrapper to capture a list of NavigationEntry components.
 */
const navigationEntries = (props: any) => (
    <ul className={styles.NavigationEntries}>
        <NavigationEntry link="/" active exact>
            MANAGEMENT
        </NavigationEntry>
        <NavigationEntry link="/hello">
            FINANCE
        </NavigationEntry>
    </ul>
);

export default navigationEntries;