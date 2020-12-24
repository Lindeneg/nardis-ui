import styles from './Sign.module.css';


export enum SignType {
    PLUS,
    MINUS
}

export interface ISignProps {
    signType: SignType,
    disabled?: boolean,
    whenClicked?: () => void
}

const sign = (props: ISignProps): JSX.Element => {
    const isPlus: boolean = props.signType === SignType.PLUS
    return (
    <div 
        className={[styles.Sign, isPlus ? styles.Plus : styles.Minus, props.disabled ? styles.NotAccess : styles.Access].join(' ')}
        onClick={!props.disabled && props.whenClicked ? props.whenClicked : () => null}
    >
        <div>
            {isPlus ? '+' : '-'}
        </div>
    </div>
    );
};

export default sign;