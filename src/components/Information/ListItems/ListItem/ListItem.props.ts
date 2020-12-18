import { PotentialRoute, Route } from "nardis-game";
import { PossibleTrain } from "../../../../containers/Management/NewRoute/NewRoute.props";
import { ListType } from "../listType";


export default interface IListItemProps {
    money: number,
    level: number,
    listType: ListType,
    whenClicked: (cityId: string) => void,
    possibleTrain?: PossibleTrain,
    potentialRoute?: PotentialRoute,
    playerRoute?: Route
}