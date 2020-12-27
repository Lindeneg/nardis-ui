import NavigationEntry from './NavigationEntry/NavigationEntry';
import Button from '../../Utility/Button/Button';
import { ButtonType } from '../../Utility/Button/buttonType';
import { Functional, RouterRouteLinkProps } from '../../../common/props';
import styles from './NavigationEntries.module.css';


interface Entry extends RouterRouteLinkProps {
    content: string
};

export interface NavigationEntriesProps {
    entries          : Entry[],
    showEndTurnButton: boolean
};


/**
 * Wrapper to capture a list of NavigationEntry components.
 */
const navigationEntries: Functional<NavigationEntriesProps> = (
    props: NavigationEntriesProps
): JSX.Element => (
    <ul className={styles.NavigationEntries}>
        {props.entries.map((entry: Entry, index: number): JSX.Element => (
            <NavigationEntry 
                key={index}
                link={entry.link}
                style={entry.style}
                active={entry.active}
                exact={entry.exact}
            >
                {entry.content} 
            </NavigationEntry>))}
        {props.showEndTurnButton ?
            <Button 
                style={{paddingTop: "5px"}} 
                whenClicked={() => console.log('end turn')} 
                disabled={false} 
                buttonType={ButtonType.END_TURN}
            > 
                    NEXT TURN
            </Button> : null}
    </ul>
);

// TODO finish button whenClicked function

export default navigationEntries;