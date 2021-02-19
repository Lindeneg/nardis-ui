import Styles from './StockOwners.module.css';
import { Functional, Props } from "../../../../common/props";


interface StockOwnersProps extends Props {
    backgroundColors: string[]
};


const stockOwners: Functional<StockOwnersProps> = (props: StockOwnersProps): JSX.Element => (
    <div className={Styles.StockOwners}>
        {props.backgroundColors.map((backgroundColor: string, index: number): JSX.Element => (
            <div 
                key={index}
                style={{backgroundColor}}
                className={Styles.StockOwner}
            > </div>
        ))}
    </div>
);


export default stockOwners;