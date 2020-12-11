import IButtonProps from "../../../Utility/Button/Button.props";
import ICityRectProps from "../../CityRect/CityRect.props";


export interface MetaButton extends IButtonProps {
    content: string
}

export default interface IOneWayRoute {
    button: MetaButton,
    cityOne: ICityRectProps,
    cityTwo: ICityRectProps
}