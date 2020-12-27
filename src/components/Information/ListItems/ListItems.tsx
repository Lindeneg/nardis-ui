import { PotentialRoute, Route } from 'nardis-game';

import { Clickable, Functional, IdFunc, Indexable, Props } from '../../../common/props';
import ListItem from './ListItem/ListItem';
import ListType from './listType';
import { PossibleTrain } from '../../../common/constants';
import styles from './ListItems.module.css';


type MetaContent  = PossibleTrain | PotentialRoute | Route;
type MetaContents = Array<MetaContent> | undefined;

interface Content extends Indexable<MetaContents> {
    possibleTrains ?: PossibleTrain[],
    potentialRoutes?: PotentialRoute[],
    playerRoutes   ?: Route[]
}

interface ListItemsProps extends Props, Clickable<IdFunc> {
    listType: ListType,
    content : Content
}


/**
 * Component for displaying a list of ListType items.
 */
const listItems: Functional<ListItemsProps> = (
    props: ListItemsProps
): JSX.Element => {

    const keys: string[]             = Object.keys(props.content);
    let jsx   : JSX.Element[] | null = null;

    for (let i: number = 0; i < keys.length; i++) {
        const key        : string           = keys[i];
        const metaContent: MetaContents     = props.content[key];
        if (metaContent && metaContent.length > 0) {
            // eslint-disable-next-line no-loop-func
            jsx = metaContent.map(((item: MetaContent, index: number): JSX.Element => (
                <ListItem 
                    whenClicked={props.whenClicked}
                    key={index}
                    listType={props.listType}
                    {...{[key.substr(0, key.length - 1)]: item}}
                />
            )));
            break;
        }
    }

    return (
        <div className={styles.ListItems}>
            {jsx}
        </div>
    );
}


export default listItems;