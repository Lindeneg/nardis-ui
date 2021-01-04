import { connect } from 'react-redux';

import { City, PotentialRoute, Route } from 'nardis-game';

import Styles from './ListItem.module.css';
import NardisState from '../../../../common/state';
import { ListType } from '../../../../common/constants';
import { Clickable, Functional, Props, IdFunc, Func, PossibleTrain } from '../../../../common/props';


interface MapStateToProps {
    money          : number,
    level          : number,
    range          : number
};

interface ListItemProps extends Props, MapStateToProps, Clickable<IdFunc> {
    listType       : ListType,
    possibleTrain ?: PossibleTrain,
    potentialRoute?: PotentialRoute,
    playerRoute   ?: Route,
    activeId      ?: string,
    city          ?: City | null
};

/**
 * Pre-formats an array of keys (strings) and values (any) in a div.
 */
const getContent: Functional<[string, any][]> = (
    contents: [string, any][]
): JSX.Element => (
    <div>
        {contents.map((content: [string, any], index: number) => (
            <pre key={index}>
                {content[0]} <span className={Styles.ListItemValue}>{content[1]}</span>
            </pre>
        ))}
    </div>
);


const mapStateToProps: Func<NardisState, MapStateToProps> = (
    state: NardisState
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
        case ListType.Destination:
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
                    ['MAX ROUTES', props.potentialRoute.cityTwo.getMaxRouteCount()]
                ]);
            }
            break;
        case ListType.Train:
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
        case ListType.Origin:
            let city: City | null = null;
            if (props.playerRoute) {
                city = props.playerRoute.getCityTwo();
            } else if (props.city) {
                city = props.city;
            }
            if (city) {
                isValid = true;
                target = city.id;
                header = city.name.toUpperCase();
                contentJSX = getContent([
                    ['SIZE', city.getSize()],
                    ['ACTIVE ROUTES', city.getCurrentRouteCount()],
                    ['MAX ROUTES', city.getMaxRouteCount()]
                ]);
            }
            break;
        default:
            break;
    }
    const active: boolean = target === props.activeId;
    return (
        <div 
            className={[isValid ? Styles.ListItem : Styles.ListItemInvalid, active ? Styles.Active : ''].join(' ')}
            onClick={isValid && !active ? props.whenClicked.bind(null, target) : () => null}
        >
            <h4 className={isValid ? Styles.Header : Styles.HeaderInvalid}>
                {header}
            </h4>
            {contentJSX}
        </div>
    );
};


export default connect(mapStateToProps)(listItem);