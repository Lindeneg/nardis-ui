import { Fragment } from 'react';

import Signs from '../../Utility/Signs/Signs';
import Styles from './Cards.module.css';
import Card, { CardProps } from './Card/Card';
import { 
    Functional, 
    Props 
} from '../../../common/props';


export interface CardsProps extends Props {
    cards: CardProps[]
};


/**
 * List of rectangle components with soft round corners. 
 */
const cards: Functional<CardsProps> = (
    props: CardsProps
): JSX.Element => (
    <div>
        <ul style={props.style} className={Styles.Cards}>
            {props.cards.map((card: CardProps, index: number): JSX.Element => (
            <Fragment key={index}>
                <li>
                    <Card {...card} />
                </li>
                {card.signs ? <Signs signs={[...card.signs]} /> : null}
            </Fragment>
            ))}
        </ul>
    </div>
);


export default cards;