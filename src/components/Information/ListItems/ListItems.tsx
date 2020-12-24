import { PotentialRoute, Route } from 'nardis-game';
import { Indexable, Props } from '../../../common/props';

import { PossibleTrain } from '../../../containers/Management/NewRoute/NewRoute.props';
import ListItem from './ListItem/ListItem';
import styles from './ListItems.module.css';

/*
export enum ListType {
    RouteDestination,
    RouteOrigin,
    RouteTrain
};
*/


type MetaListContent  = PossibleTrain | PotentialRoute | Route;
type MetaListContents = Array<MetaListContent> | undefined;

interface Meta extends Indexable<MetaListContents> {
    possibleTrains ?: PossibleTrain[],
    potentialRoutes?: PotentialRoute[],
    playerRoutes   ?: Route[]
}

export enum ListType {
    POTENTIAL_ROUTE_DESTINATION,
    POTENTIAL_ROUTE_ORIGIN,
    POTENTIAL_ROUTE_TRAIN
}


export interface ListItemsProps extends Props {
    listType: ListType,
    whenClicked: (cityId: string) => void,
    content: Meta
}

const listItems = (props: ListItemsProps): JSX.Element => {

    const keys: string[] = Object.keys(props.content);
    let jsx: JSX.Element[] | null = null;

    for (let i: number = 0; i < keys.length; i++) {
        const key: string = keys[i];
        const metaContent: MetaListContents = props.content[key];
        if (metaContent && metaContent.length > 0) {
            jsx = metaContent.map(((item: MetaListContent, index: number) => (
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