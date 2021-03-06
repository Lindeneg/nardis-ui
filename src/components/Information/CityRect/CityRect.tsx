import { City, CityResource, RouteCargo } from "nardis-game";

import CityResources from './CityResources/CityResources';
import Styles from './CityRect.module.css';
import { Functional, Props } from "../../../common/props";
import { Direction } from '../../../common/constants'


export interface CityRectProps extends Props {
    direction    : Direction,
    city         : City | null,
    cityNameColor: string,
    showSize     : boolean,
    routeCargo   : RouteCargo[]
};


/**
 * Component to display city name, size and either supply or demand resources but not both.
 */
const cityRect: Functional<CityRectProps> = (
    props: CityRectProps
): JSX.Element => {

    const isDeparture: boolean            = props.direction === Direction.Departure;
    let name         : string             = 'NO DESTINATION COULD BE FOUND';
    let resources    : CityResource[]     = [];
    let sizeJSX      : JSX.Element | null = null;
    let maxCapacity  : JSX.Element | null = null;

    if (props.city) {
        name      = props.city.name;
        resources = isDeparture ? props.city.getSupply() : props.city.getDemand();
        sizeJSX   = props.showSize ? <span> | SIZE {props.city.getSize()} {props.city.isFull() ? '| IS FULL' : ''}</span> : null;
    }

    return (
        <div className={Styles.CityRect}>
            <h4 
                className={Styles.CityName}
                style={{color: props.cityNameColor}}
            >
                {name.toUpperCase()} 
                {props.city ? (isDeparture ? ' SUPPLY' : ' DEMAND') : null} 
                {sizeJSX}
                {maxCapacity}
            </h4>
            <CityResources routeCargo={props.routeCargo} resources={resources} isDeparture={isDeparture} />
        </div>
    );
};


export default cityRect;