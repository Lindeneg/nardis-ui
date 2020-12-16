import { PotentialRoute } from "nardis-game";


export default interface IPotentialRouteProps {
    potentialRoute: PotentialRoute,
    money: number,
    whenClicked: (cityId: string) => void
}