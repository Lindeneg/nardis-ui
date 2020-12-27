import { connect } from 'react-redux';

import { PotentialRoute, Route } from 'nardis-game';

import { Clickable, Functional, Props, IdFunc, Func } from '../../../../common/props';
import { INardisState } from '../../../../common/state';
import ListType from '../listType';
import { PossibleTrain } from '../../../../common/constants';
import styles from './ListItem.module.css';


type Content = [string, any];

interface MapStateToProps {
    money: number,
    level: number,
    range: number
};

interface ListItemProps extends Props, MapStateToProps, Clickable<IdFunc> {
    listType       : ListType,
    possibleTrain ?: PossibleTrain,
    potentialRoute?: PotentialRoute,
    playerRoute   ?: Route
};

/**
 * Pre-formats an array of keys (strings) and values (any) in a div.
 */
const getContent: Functional<Content[]> = (
    contents: Content[]
): JSX.Element => (
    <div>
        {contents.map((content: Content, index: number) => (
            <pre key={index}>
                {content[0]} <span className={styles.ListItemValue}>{content[1]}</span>
            </pre>
        ))}
    </div>
);

 // TODO fix NardisState
const mapStateToProps: Func<INardisState, MapStateToProps> = (
    state: INardisState
): MapStateToProps => ({
    money: state.money,
    level: state.level,
    range: state.range
});


/**
 * Component for displaying a listitem given specified properties.
 */
const listItem: Functional<ListItemProps> = (
    props: ListItemProps
): JSX.Element => {

    // This could probably be made cleaner.
    
    let isValid   : boolean            = false;
    let header    : string             = '';
    let target    : string             = '';
    let contentJSX: JSX.Element | null = null;

    switch (props.listType) {
        case ListType.POTENTIAL_ROUTE_DESTINATION:
            if (props.potentialRoute) {
                isValid = (
                    props.money >= props.potentialRoute.goldCost && 
                    props.range >= props.potentialRoute.distance && 
                    !props.potentialRoute.cityTwo.isFull()
                );
                target = props.potentialRoute.cityTwo.id;
                header = props.potentialRoute.cityTwo.name.toUpperCase();
                contentJSX = getContent([
                    ['SIZE', props.potentialRoute.cityTwo.getSize()],
                    ['DISTANCE', props.potentialRoute.distance + 'KM'],
                    ['GOLD COST', props.potentialRoute.goldCost + 'G'],
                    ['TURN COST', props.potentialRoute.turnCost],
                    ['ACTIVE ROUTES', props.potentialRoute.cityTwo.getCurrentRouteCount()],
                    ['MAX ROUTES', 5] // TODO get actual max route
                ]);
            }
            break;
        case ListType.POTENTIAL_ROUTE_TRAIN:
            if (props.possibleTrain) {
                isValid = (
                    props.possibleTrain.cost <= props.money && 
                    props.possibleTrain.train.levelRequired <= props.level
                );
                target = props.possibleTrain.train.id;
                header = props.possibleTrain.train.name.toUpperCase();
                contentJSX = getContent([
                    ['COST', props.possibleTrain.cost + 'G'],
                    ['UPKEEP', props.possibleTrain.train.upkeep + 'G/TURN'],
                    ['SPEED', props.possibleTrain.train.speed + 'KM/TURN'],
                    ['CARGO SPACE', props.possibleTrain.train.cargoSpace + 'T'],
                    ['LEVEL REQUIRED', props.possibleTrain.train.levelRequired]
                ]);
            }
            break;
        case ListType.POTENTIAL_ROUTE_ORIGIN:
            if (props.playerRoute) {

            }
            break;
        default:
            break;
    }
    return (
        <div 
            className={isValid ? styles.ListItem : styles.ListItemInvalid}
            onClick={isValid ? props.whenClicked.bind(null, target) : () => null}
        >
            <h4 className={isValid ? styles.Header : styles.HeaderInvalid}>
                {header}
            </h4>
            {contentJSX}
        </div>
    );
};


export default connect(mapStateToProps)(listItem);