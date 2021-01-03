import { City, CityResource, PotentialRoute, RouteCargo } from "nardis-game";
import { CardProps } from "../../../../../components/Information/Cards/Card/Card";
import { CardsProps } from "../../../../../components/Information/Cards/Cards";
import { CargoChange } from "../../NewRoute";
import { RouteRevolution, SignType } from '../../../../../common/constants';
import {Selection} from './CargoSelector';
import { NIndexable } from "../../../../../common/props";


interface AvailableCargo extends NIndexable<number> {
    [RouteRevolution.NonFull]: number,
    [RouteRevolution.Full]: number
};

const headerStyle = {margin: '0', backgroundColor: 'darkblue'};
const contentStyle = {margin: '0', backgroundColor: '#212fa2'};
const cardSStyle = {margin: '0'};


/**
 * 
 */
const getCardHeader = (from: string, to: string, availableCargo: AvailableCargo, key: RouteRevolution): CardsProps => ({
    cards: [
        {
            label: 'FROM',
            value: from.toUpperCase(),
            style: headerStyle,
            spanStyle: {color: key === RouteRevolution.NonFull ? 'yellow' : 'lightgreen'}
        },
        {
            label: 'TO',
            value: to.toUpperCase(),
            style: headerStyle,
            spanStyle: {color: key === RouteRevolution.NonFull ? 'lightgreen' : 'yellow'}
        },
        {
            label: 'CARGO SPACE',
            value: availableCargo[key] + 'T',
            style: headerStyle,
            spanStyle: {color: availableCargo[key] <= 0 ? 'gray' : 'white'}
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
    chosenRoute: PotentialRoute[],
    availableCargo: number,
    whenClickedAdd: CargoChange,
    whenClickedRemoved: CargoChange
): {first: Selection | null, second: Selection | null} => {

    const available: AvailableCargo = {
        [RouteRevolution.NonFull]: availableCargo - cityOneCargo.map(e => e.targetAmount * e.resource.getWeight()).reduce((a, b) => a + b, 0),
        [RouteRevolution.Full]: availableCargo - cityTwoCargo.map(e => e.targetAmount * e.resource.getWeight()).reduce((a, b) => a + b, 0)
    };

    let first: Selection | null = null;
    let second: Selection | null = null;

    if (chosenRoute.length > 0) {
        const [cityOne, cityTwo] = [chosenRoute[0].cityOne, chosenRoute[0].cityTwo];

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