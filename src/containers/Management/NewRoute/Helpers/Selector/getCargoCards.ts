import { CSSProperties } from "react";

import { City, CityResource, PotentialRoute, Route, RouteCargo } from "nardis-game";

import { Selection } from './CargoSelector';
import { CardProps } from "../../../../../components/Information/Cards/Card/Card";
import { CardsProps } from "../../../../../components/Information/Cards/Cards";
import { CargoChange } from "../../NewRoute";
import { NIndexable } from "../../../../../common/props";
import { cardDefaultStyle, RouteRevolution, SignType } from '../../../../../common/constants';


interface AvailableCargo extends NIndexable<number> {
    [RouteRevolution.NonFull]: number,
    [RouteRevolution.Full]: number
};

const contentStyle: CSSProperties = {margin: '0', backgroundColor: '#212fa2'};
const cardSStyle  : CSSProperties = {margin: '0'};
const style       : CSSProperties = cardDefaultStyle;


/**
 * 
 */
const getCardHeader = (
    from: string, 
    to: string, 
    availableCargo: AvailableCargo, 
    key: RouteRevolution
): CardsProps => ({
    cards: [
        {
            label: 'FROM',
            value: from.toUpperCase(),
            spanStyle: {color: key === RouteRevolution.NonFull ? 'yellow' : 'lightgreen'},
            style
        },
        {
            label: 'TO',
            value: to.toUpperCase(),
            spanStyle: {color: key === RouteRevolution.NonFull ? 'lightgreen' : 'yellow'},
            style
        },
        {
            label: 'CARGO SPACE',
            value: availableCargo[key] + 'T',
            spanStyle: {color: availableCargo[key] <= 0 ? 'gray' : 'white'},
            style
        }
    ],
    style: cardSStyle
});


/**
 * 
 */
const getCardContent = (
        city: City, 
        cityCargo: RouteCargo[],
        availableCargo: AvailableCargo,
        key: RouteRevolution,
        clickAdd: CargoChange, 
        clickRemove: CargoChange
): CardsProps => ({
    cards: city.getSupply()
    .sort((a, b) => a.resource.getValue() - b.resource.getValue())
    .map((citySupply: CityResource): CardProps => {
        const match: RouteCargo[] = cityCargo.filter(cargo => cargo.resource.equals(citySupply.resource));
        const amount: number = match.length > 0 ? match[0].targetAmount : 0;
        return {
            label: citySupply.resource.name.toUpperCase(),
            value: 'X' + amount,
            style: contentStyle,
            signs: [
                {
                    signType: SignType.Plus,
                    disabled: (
                        availableCargo[key] <= 0 ||
                        citySupply.resource.getWeight() > availableCargo[key] ||
                        citySupply.available - amount <= 0
                    ),
                    whenClicked: () => clickAdd(citySupply.resource, key)
                },
                {
                    signType: SignType.Minus,
                    disabled: amount <= 0,
                    whenClicked: () => clickRemove(citySupply.resource, key)
                }
            ]
        };
    }),
    style: cardSStyle
});


/**
 * 
 */
export const getCargoCards = (
    cityOneCargo: RouteCargo[],
    cityTwoCargo: RouteCargo[],
    availableCargo: number,
    whenClickedAdd: CargoChange,
    whenClickedRemoved: CargoChange,
    chosenRoute?: PotentialRoute[],
    activeRoute?: Route[]
): {first: Selection | null, second: Selection | null} => {

    const available: AvailableCargo = {
        [RouteRevolution.NonFull]: availableCargo - cityOneCargo.map(e => e.targetAmount * e.resource.getWeight()).reduce((a, b) => a + b, 0),
        [RouteRevolution.Full]: availableCargo - cityTwoCargo.map(e => e.targetAmount * e.resource.getWeight()).reduce((a, b) => a + b, 0)
    };

    let first: Selection | null = null;
    let second: Selection | null = null;
    let cityOne: City | null = null; let cityTwo: City | null = null;

    if (chosenRoute && chosenRoute.length > 0) {
        [cityOne, cityTwo] = [chosenRoute[0].cityOne, chosenRoute[0].cityTwo];
    } else if (activeRoute && activeRoute.length > 0) {
        [cityOne, cityTwo] = [activeRoute[0].getCityOne(), activeRoute[0].getCityTwo()];
    }

    if (cityOne && cityTwo) {
        first = {
            cargo: getCardContent(cityOne, cityOneCargo, available, RouteRevolution.NonFull, whenClickedAdd, whenClickedRemoved),
            header: getCardHeader(cityOne.name, cityTwo.name, available, RouteRevolution.NonFull)
        };
    
        second = {
            cargo: getCardContent(cityTwo, cityTwoCargo, available, RouteRevolution.Full, whenClickedAdd, whenClickedRemoved),
            header: getCardHeader(cityTwo.name, cityOne.name, available, RouteRevolution.Full)
    
        };
    }
    return {first, second};
};