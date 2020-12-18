import Card from './Card/Card';
import ICardsProps from './Cards.props';
import ICardProps from './Card/Card.props';
import styles from './Cards.module.css';


const cards = (props: ICardsProps): JSX.Element => {
    const jsx: JSX.Element[] = props.cards.map((card: ICardProps, index: number): JSX.Element => {
        return (
            <li key={index}>
                <Card {...card} />
            </li>
        );
    });
    return (
        <div>
            <ul style={props.style} className={styles.Cards}>
                {jsx}
            </ul>
        </div>
    );
};


export default cards;