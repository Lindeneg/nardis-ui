import { CSSProperties } from 'react';

import { Functional, Props } from '../../../../common/props';
import { SignProps } from '../../../Utility/Signs/Sign/Sign';
import styles from './Card.module.css';


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
        className={styles.Card} 
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