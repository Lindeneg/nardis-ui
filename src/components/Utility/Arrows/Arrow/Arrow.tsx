import Styles from './Arrow.module.css';
import { Functional, Props } from "../../../../common/props";
import { ArrowDirection } from '../../../../common/constants';
import { Fragment } from 'react';


export interface ArrowProps extends Props {
    arrowDirection: ArrowDirection
};


/**
 * Component using HTML entities to display an arrow.
 */
const arrow: Functional<ArrowProps> = (
    props: ArrowProps
): JSX.Element => (
    <Fragment>
        {props.arrowDirection === ArrowDirection.Left ? 
            <p 
                className={Styles.Arrow} 
                style={props.style}
            >
                &#8656;
            </p> 
        :
            <p 
                className={Styles.Arrow} 
                style={props.style}
            >
                &#8658;
            </p>
        }
    </Fragment>
);


export default arrow;