import { connect } from 'react-redux';

import { INardisState } from '../../../../common/state';
import { ListType } from '../listType';
import styles from './ListItem.module.css';
import IListItemProps from './ListItem.props';

type T = [string, any];

const getContent = (content: T[]): JSX.Element => (
    <div>
        {content.map((t: T, i: number) => (
            <pre key={i}>
                {t[0]} <span className={styles.ListItemValue}>{t[1]}</span>
            </pre>
        ))}
    </div>
)


const listItem = (props: IListItemProps): JSX.Element => {
    
    let isValid: boolean = false;
    let header: string = '';
    let target: string = '';
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
                    ['MAX ROUTES', 5]
                ]);
            }
            break;
        case ListType.POTENTIAL_ROUTE_TRAIN:
            if (props.possibleTrain) {
                isValid = props.possibleTrain.cost <= props.money && props.possibleTrain.train.levelRequired <= props.level;
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

const mapStateToProps = (state: INardisState): {money: number, level: number, range: number} => ({
    money: state.money,
    level: state.level,
    range: state.range
});

export default connect(mapStateToProps)(listItem);