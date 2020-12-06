import CardProps from './Card.props';
import styles from './Card.module.css';


const card = (props: CardProps): JSX.Element => {
    return (
        <div className={styles.Card}>
            <p>
                {props.label}
                <span>
                    {props.value}
                </span>
            </p>
        </div>
    );
};


export default card;