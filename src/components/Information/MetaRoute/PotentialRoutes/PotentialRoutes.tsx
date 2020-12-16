import { PotentialRoute } from "nardis-game";
import CPotentialRoute from './PotentialRoute/PotentialRoute';
import styles from './PotentialRoutes.module.css';
import IPotentialRoutesProps from "./PotentialRoutes.props";



const potentialRoutes = (props: IPotentialRoutesProps): JSX.Element => (
    <div className={styles.PotentialRoutes}>
        {props.potentialRoutes.map((route: PotentialRoute, index: number) => (
            <CPotentialRoute 
                whenClicked={props.whenClicked} 
                key={index} 
                potentialRoute={route} 
            />
        ))}
    </div>
)

export default potentialRoutes;