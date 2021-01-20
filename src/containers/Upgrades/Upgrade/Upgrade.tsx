import Styles from './Upgrade.module.css';
import { Functional, Props } from "../../../common/props";


interface UpgradeProps extends Props {
    description  : string,
    levelRequired: number,
    cost         : number,
    purchased    : boolean,
    purchaseable : boolean
    purchase     : () => void
}

/**
 * Component to display information about a given Nardis Upgrade.
 */
const upgrade: Functional<UpgradeProps> = (
    props: UpgradeProps
): JSX.Element => (
    <div 
        className={[Styles.Upgrade, props.purchaseable ? '' : Styles.Unpurchaseable, props.purchased ? Styles.Purchased : ''].join(' ')}
        onClick={props.purchaseable && !props.purchased ? () => props.purchase() : () => null}
    >
        <p>{props.description}</p>
        <p>MINIMUM LEVEL {props.levelRequired}</p>
        <p>{props.cost}G</p>
    </div>
);


export default upgrade;