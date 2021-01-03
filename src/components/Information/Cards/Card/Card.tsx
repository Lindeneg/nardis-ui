import { CSSProperties } from 'react';

import Styles from './Card.module.css';
import { Functional, Props } from '../../../../common/props';
import { SignProps } from '../../../Utility/Signs/Sign/Sign';


export interface CardProps extends Props {
    label     : string,
    value     : string,
    signs    ?: SignProps[],
    spanStyle?: CSSProperties
};


/**
 * Component styled as a rectangle with soft, round corners. 
 */
const card: Functional<CardProps> = (
    props: CardProps
): JSX.Element => (
    <div 
        className={Styles.Card} 
        style={props.style ? props.style : {}} 
    >
        <p>
            {props.label}
            <span style={props.spanStyle}>
                {props.value}
            </span>
        </p>
    </div>
);


export default card;