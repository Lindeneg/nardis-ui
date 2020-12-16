import { PotentialRoute } from "nardis-game";


export default interface IPotentialRoutesProps {
    potentialRoutes: PotentialRoute[],
    whenClicked: (cityId: string) => void
}