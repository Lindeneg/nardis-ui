import Arrow, { ArrowProps } from './Arrow/Arrow';
import Styles from './Arrows.module.css';
import { Functional, Props } from "../../../common/props";


interface ArrowsProps extends Props {
    arrows: ArrowProps[]
};


/**
 * Component to display n amount of Arrow components.
 */
const arrows: Functional<ArrowsProps> = (
    props: ArrowsProps
) => (
    <div className={Styles.Arrows}>
        {props.arrows.map((arrow: ArrowProps, index: number) => (
            <Arrow
                key={index}
                {...arrow}
            />
        ))}
    </div>
);


export default arrows;