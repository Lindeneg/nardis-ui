import Sign, { ISignProps } from './Sign/Sign';
import styles from './Signs.module.css';

export interface ISignsProps {
    signs: ISignProps[]
}

const signs = (props: ISignsProps): JSX.Element => (
    <div className={styles.Signs}>
        {props.signs.map((sign: ISignProps, index: number): JSX.Element => (
            <Sign key={index} {...sign} />
        ))}
    </div>
);

export default signs;