import { connect } from 'react-redux';

import { INardisState } from '../../../../../common/state';
import styles from './PotentialRoute.module.css';
import IPotentialRouteProps from './PotentialRoute.props';


const potentialRoute = (props: IPotentialRouteProps): JSX.Element => {
    const isValid: boolean = props.potentialRoute.distance <= 100;  // props.money >= props.potentialRoute.goldCost && !props.potentialRoute.cityTwo.isFull();
    const clickFunc: (cityId: string) => void = isValid ? props.whenClicked : (cityId: string) => {};
    return (
        <div 
            className={isValid ? styles.PotentialRoute : styles.PotentialRouteInvalid}
            onClick={() => clickFunc(props.potentialRoute.cityTwo.id)}
        >
            <h4 
                className={isValid ? styles.CityName : styles.CityNameInvalid}
            >
                {props.potentialRoute.cityTwo.name.toUpperCase()}
            </h4>
            <pre>SIZE      : {props.potentialRoute.cityTwo.getSize()}</pre>
            <pre>DISTANCE  : {props.potentialRoute.distance}km</pre>
            <pre>GOLD COST : {props.potentialRoute.goldCost}g</pre>
            <pre>TURN COST : {props.potentialRoute.turnCost}t</pre>
        </div>
    );
};

const mapStateToProps = (state: INardisState): {money: number} => ({
    money: state.money
});

export default connect(mapStateToProps)(potentialRoute);