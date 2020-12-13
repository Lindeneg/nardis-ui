import ICityRectProps from "./CityRect.props";
import CityResources from './CityResources/CityResources';
import styles from './CityRect.module.css';
import { CityResource } from "nardis-game";


const rect = (props: ICityRectProps) => {
    let ch: number = 0;
    let name: string = 'NO DESTINATION COULD BE FOUND';
    let resources: CityResource[] = [];
    let sizeJSX: JSX.Element | null = null;

    if (props.city) {
        ch = 1;
        name = props.city.name;
        resources = props.from ? props.city.getSupply() : props.city.getDemand();
        sizeJSX = props.showSize ? <span> | SIZE {props.city.getSize()}</span> : null;
    }

    return (
        <div className={styles.CityRect}>
            <h4 
                className={styles.CityName}
                style={{color: props.cityNameColor}}
            >
                {name.toUpperCase()} {ch ? (props.from ? 'SUPPLY' : 'DEMAND') : null} {sizeJSX}
            </h4>
            <CityResources resources={resources} />
        </div>
    );;
}

export default rect;