import Styles from './Signs.module.css';
import Sign, { SignProps } from './Sign/Sign';
import { Functional, Props } from '../../../common/props';


interface SignsProps extends Props {
    signs: SignProps[]
};


/**
 * Collection of two clickable sign components.
 */
const signs: Functional<SignsProps> = (
    props: SignsProps
): JSX.Element => (
    <div className={Styles.Signs}>
        {props.signs.map((sign: SignProps, index: number): JSX.Element => (
            <Sign key={index} {...sign} />
        ))}
    </div>
);


export default signs;