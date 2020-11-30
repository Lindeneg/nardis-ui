import styles from './Card.module.css';


interface CardProp {
    label: string,
    value: string
};


const card = (props: CardProp): JSX.Element => {
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