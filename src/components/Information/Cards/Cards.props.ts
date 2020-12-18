import { IStyle } from '../../../common/props';
import ICardProps from './Card/Card.props';


export default interface ICardsProps extends IStyle {
    cards: ICardProps[]
}
