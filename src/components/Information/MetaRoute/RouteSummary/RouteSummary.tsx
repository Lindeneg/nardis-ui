import styles from './RouteSummary.module.css';


interface Props {
    distance: number,
    goldCost: number,
    turnCost: number,
    train?: any,
    cargo?: any
}

const routeSummary = (props: Props): JSX.Element => (
    <div className={styles.RouteSummary}>
        <ul>
            <li>
                <pre>DISTANCE       {props.distance}KM</pre>
            </li>
            <li>
                <pre>GOLD COST   {props.goldCost}G</pre>
            </li>
            <li>
                <pre>TURN COST    {props.turnCost}</pre>
            </li>
            {props.train && props.cargo ? <div>more</div> : null}
        </ul>
    </div>
);

export default routeSummary;