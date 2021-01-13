import { City, PotentialRoute, Route } from 'nardis-game';

import ListItem from './ListItem/ListItem';
import Styles from './ListItems.module.css';
import { ListType } from '../../../common/constants';
import { 
    Clickable, 
    Functional, 
    IdFunc, 
    Indexable, 
    Props, 
    PossibleTrain 
} from '../../../common/props';


type MetaContent  = PossibleTrain | PotentialRoute | Route;
type MetaContents = Array<MetaContent> | undefined;

interface Content extends Indexable<MetaContents> {
    possibleTrains ?: PossibleTrain[],
    potentialRoutes?: PotentialRoute[],
    playerRoutes   ?: Route[]
};

interface ListItemsProps extends Props, Clickable<IdFunc> {
    listType        : ListType,
    content         : Content,
    activeId       ?: string,
    city           ?: City | null
};


/**
 * Removes duplicate cities from route array for origin selection.
 */
const removeDuplicatesFromOriginSelection = (
    contents: MetaContents, 
    listType: ListType
): MetaContents => {
    if (contents && listType === ListType.Origin) {
        const seen: string[] = [];
        // @ts-expect-error
        return contents.filter((e: Route): boolean => {
            const id: string = e.getCityTwo().id;
            if (seen.indexOf(id) > -1) {
                return false;
            }
            seen.push(id);
            return true;
        })
    }
    return contents;
}


/**
 * Component for displaying a list of ListType items.
 */
const listItems: Functional<ListItemsProps> = (
    props: ListItemsProps
): JSX.Element => {
    const keys: string[]      = Object.keys(props.content);
    let jsx   : JSX.Element[] = [];

    for (let i: number = 0; i < keys.length; i++) {
        const key        : string           = keys[i];
        const metaContent: MetaContents     = removeDuplicatesFromOriginSelection(props.content[key], props.listType);
        if (metaContent && metaContent.length > 0) {
            if (props.city && props.city !== null) {
                jsx.push(
                    <ListItem
                        key={props.city.id}
                        whenClicked={props.whenClicked}
                        listType={props.listType}
                        activeId={props.activeId}
                        city={props.city}
                    />
                )   
            }
            // eslint-disable-next-line no-loop-func
            jsx.push(...metaContent.map(((item: MetaContent, index: number): JSX.Element => (
                <ListItem 
                    whenClicked={props.whenClicked}
                    key={index}
                    listType={props.listType}
                    activeId={props.activeId}
                    {...{[key.substr(0, key.length - 1)]: item}}
                />
            ))));
            break;
        }
    }

    return (
        <div className={Styles.ListItems}>
            {jsx}
        </div>
    );
}


export default listItems;