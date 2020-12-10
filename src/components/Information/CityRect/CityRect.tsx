import ICityRectProps from "./CityRect.props";
import CityResources from './CityResources/CityResources';
import styles from './CityRect.module.css';


const rect = (props: ICityRectProps) => {
    let jsx: JSX.Element = <div>No City Found</div>;
    if (props.city) {
        const name: string = props.city.name;
        const resources = props.from ? props.city.getSupply() : props.city.getDemand();
        const size: JSX.Element | null = props.showSize ? <span> | SIZE {props.city.getSize()}</span> : null;
        jsx = (
            <div className={styles.CityRect}>
                <h4 
                    className={styles.CityName}
                    style={{color: props.cityNameColor}}
                >
                    {name.toUpperCase()} {props.from ? 'SUPPLY' : 'DEMAND'} {size}
                </h4>
                <CityResources resources={resources} />
            </div>
        );
    }
    return jsx;
}

export default rect;