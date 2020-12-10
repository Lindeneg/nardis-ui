import { City } from "nardis-game";

export default interface ICityRectProps {
    from: boolean,
    city: City | null
    cityNameColor: string,
    showSize: boolean
}