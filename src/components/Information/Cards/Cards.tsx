import Card from './Card/Card';
import CardsProps from './Cards.props';
import CardProps from './Card/Card.props';

import styles from './Cards.module.css';


const cards = (props: CardsProps): JSX.Element => {
    const jsx: JSX.Element[] = props.cards.map((card: CardProps, index: number): JSX.Element => {
        return (
            <li key={index}>
                <Card label={card.label} value={card.value} />
            </li>
        );
    });
    return (
        <div>
            <ul className={styles.Cards}>
                {jsx}
            </ul>
        </div>
    );
};


export default cards;