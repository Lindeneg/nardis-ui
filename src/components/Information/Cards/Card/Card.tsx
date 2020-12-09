import ICardProps from './Card.props';
import styles from './Card.module.css';


const card = (props: ICardProps): JSX.Element => {
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