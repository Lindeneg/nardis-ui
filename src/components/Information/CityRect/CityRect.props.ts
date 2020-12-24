import { City, RouteCargo } from "nardis-game";

export default interface ICityRectProps {
    from: boolean,
    city: City | null
    cityNameColor: string,
    showSize: boolean,
    routeCargo: RouteCargo[]
}