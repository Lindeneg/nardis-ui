import { Functional, Props } from '../../../common/props';
import Sign, { SignProps } from './Sign/Sign';
import styles from './Signs.module.css';


interface SignsProps extends Props {
    signs: SignProps[]
}


/**
 * Collection of two clickable sign components.
 */
const signs: Functional<SignsProps> = (
    props: SignsProps
): JSX.Element => (
    <div className={styles.Signs}>
        {props.signs.map((sign: SignProps, index: number): JSX.Element => (
            <Sign key={index} {...sign} />
        ))}
    </div>
);


export default signs;