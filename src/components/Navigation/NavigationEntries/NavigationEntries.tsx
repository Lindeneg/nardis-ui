import NavigationEntry from './NavigationEntry/NavigationEntry';
import Button from '../../Utility/Button/Button';
import { ButtonType } from '../../Utility/Button/buttonType';
import { NoProps } from '../../../common/props';
import styles from './NavigationEntries.module.css';

// TODO finish button whenClicked function

/**
 * Wrapper to capture a list of NavigationEntry components.
 */

const navigationEntries = (props: NoProps): JSX.Element => (
    <ul className={styles.NavigationEntries}>
        <NavigationEntry link="/" active>
            MANAGEMENT
        </NavigationEntry>
        <NavigationEntry link="/finance">
            FINANCE
        </NavigationEntry>
        <NavigationEntry link="/upgrades">
            UPGRADES
        </NavigationEntry>
        <NavigationEntry link="/resources">
            RESOURCES
        </NavigationEntry>
        <NavigationEntry link="/opponents">
            OPPONENTS
        </NavigationEntry>
        <Button style={{paddingTop: "5px"}} whenClicked={() => console.log('end turn')} disabled={false} buttonType={ButtonType.END_TURN}> 
            NEXT TURN
        </Button>
    </ul>
);


export default navigationEntries;