import { PotentialRoute, Route } from "nardis-game";
import { PossibleTrain } from "../../../../containers/Management/NewRoute/NewRoute.props";
import { ListType } from "../listType";


export default interface IListItemProps {
    money: number,
    listType: ListType,
    whenClicked: (cityId: string) => void,
    possibleTrains?: PossibleTrain,
    potentialRoutes?: PotentialRoute,
    playerRoutes?: Route
}