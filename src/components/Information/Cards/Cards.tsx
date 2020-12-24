import { Fragment } from 'react';

import Card, { CardProps } from './Card/Card';
import Signs from '../../Utility/Signs/Signs';
import { Functional, Props } from '../../../common/props';
import styles from './Cards.module.css';


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
        <ul style={props.style} className={styles.Cards}>
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