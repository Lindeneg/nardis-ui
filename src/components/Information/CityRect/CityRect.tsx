import { City, CityResource, RouteCargo } from "nardis-game";

import CityResources from './CityResources/CityResources';
import { Functional, Props } from "../../../common/props";
import { Direction } from '../../../common/constants'
import styles from './CityRect.module.css';


interface CityRectProps extends Props {
    from         : boolean, // TODO DELETE
    direction   ?: Direction, // FROM === DIRECTION.DEPARTURE
    city         : City | null
    cityNameColor: string,
    showSize     : boolean,
    routeCargo   : RouteCargo[]
}


/**
 * Component to display city name, size and either supply or demand resources but not both.
 */
const cityRect: Functional<CityRectProps> = (
    props: CityRectProps
): JSX.Element => {

    let name     : string             = 'NO DESTINATION COULD BE FOUND';
    let resources: CityResource[]     = [];
    let sizeJSX  : JSX.Element | null = null;

    if (props.city) {
        name      = props.city.name;
        resources = props.from ? props.city.getSupply() : props.city.getDemand();
        sizeJSX   = props.showSize ? <span> | SIZE {props.city.getSize()}</span> : null;
    }

    return (
        <div className={styles.CityRect}>
            <h4 
                className={styles.CityName}
                style={{color: props.cityNameColor}}
            >
                {name.toUpperCase()} {props.city ? (props.from ? 'SUPPLY' : 'DEMAND') : null} {sizeJSX}
            </h4>
            <CityResources routeCargo={props.routeCargo} resources={resources} />
        </div>
    );
};


export default cityRect;