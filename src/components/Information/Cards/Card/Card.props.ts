import { CSSProperties } from "react";
import { IStyle } from "../../../../common/props";

export default interface ICardProps extends IStyle {
    label: string,
    value: string
}