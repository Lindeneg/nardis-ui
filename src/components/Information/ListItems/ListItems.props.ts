import { PotentialRoute, Route } from "nardis-game";
import { PossibleTrain } from "../../../containers/Management/NewRoute/NewRoute.props";
import { ListType } from './listType';

export type IMetaListContent = PossibleTrain | PotentialRoute | Route;
export type IMetaListContents = Array<IMetaListContent> | undefined;

export default interface IListItemsProps {
    listType: ListType,
    whenClicked: (cityId: string) => void,
    content: {
        [key: string]: IMetaListContents,
        possibleTrains?: PossibleTrain[],
        potentialRoutes?: PotentialRoute[],
        playerRoutes?: Route[]
    }
}