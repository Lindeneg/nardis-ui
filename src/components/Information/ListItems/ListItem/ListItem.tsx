import { connect } from 'react-redux';

import { INardisState } from '../../../../common/state';
import { ListType } from '../listType';
import styles from './ListItem.module.css';
import IListItemProps from './ListItem.props';


const listItem = (props: IListItemProps): JSX.Element => {
    
    let isValid: boolean = false;
    let header: string = '';
    let target: string = '';
    let contentJSX: JSX.Element | null = null;

    switch (props.listType) {
        case ListType.POTENTIAL_ROUTE_DESTINATION:
            if (props.potentialRoutes) {
                isValid = props.potentialRoutes.distance <= 100; // TODO props.money >= props.potentialRoute.goldCost && !props.potentialRoute.cityTwo.isFull();
                target = props.potentialRoutes.cityTwo.id;
                header = props.potentialRoutes.cityTwo.name.toUpperCase();
                contentJSX = (
                    <div>
                        <pre>SIZE      : {props.potentialRoutes.cityTwo.getSize()}</pre>
                        <pre>DISTANCE  : {props.potentialRoutes.distance}KM</pre>
                        <pre>GOLD COST : {props.potentialRoutes.goldCost}G</pre>
                        <pre>TURN COST : {props.potentialRoutes.turnCost}</pre>
                    </div>
                );
            }
            break;
        case ListType.POTENTIAL_ROUTE_TRAIN:
            if (props.possibleTrains) {

            }
            break;
        case ListType.POTENTIAL_ROUTE_ORIGIN:
            if (props.playerRoutes) {

            }
            break;
        default:
            break;
    }
    
    return (
        <div 
            className={isValid ? styles.ListItem : styles.ListItemInvalid}
            onClick={props.whenClicked.bind(null, target)}
        >
            <h4 className={isValid ? styles.Header : styles.HeaderInvalid}>
                {header}
            </h4>
            {contentJSX}
        </div>
    );
};

const mapStateToProps = (state: INardisState): {money: number} => ({
    money: state.money
});

export default connect(mapStateToProps)(listItem);