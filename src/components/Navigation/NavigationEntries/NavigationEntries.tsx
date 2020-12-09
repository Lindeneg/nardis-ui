import NavigationEntry from './NavigationEntry/NavigationEntry';
import Button from '../../Utility/Button/Button';
import { ButtonType } from '../../Utility/Button/buttonType';
import INavigationEntriesProps from './NavigationEntries.props';
import styles from './NavigationEntries.module.css';


// TODO finish button whenClicked function

/**
 * Wrapper to capture a list of NavigationEntry components.
 */

const navigationEntries = (props: INavigationEntriesProps): JSX.Element => {
    return (
        <ul className={styles.NavigationEntries}>
            {
                props.entries.map((entry, index) => (
                    <NavigationEntry 
                        key={index}
                        link={entry.link}
                        style={entry.style}
                        active={entry.active}
                        exact={entry.exact}
                    >
                        {entry.content} 
                    </NavigationEntry>
                ))
            }
            {
                props.showEndTurnButton ?
                    <Button 
                        style={{paddingTop: "5px"}} 
                        whenClicked={() => console.log('end turn')} 
                        disabled={false} 
                        buttonType={ButtonType.END_TURN}
                    > 
                            NEXT TURN
                    </Button> : null
            }
        </ul>
    )
}


export default navigationEntries;