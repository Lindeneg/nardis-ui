import { City } from "nardis-game";

import Button from '../../../components/Utility/Button/Button';
import Arrows from '../../../components/Utility/Arrows/Arrows';
import { IdFunc, Functional, Props } from "../../../common/props";
import { ArrowDirection, ButtonType } from "../../../common/constants";
import Styles from './MetaRoute.module.css';


interface MetaRouteProps extends Props {
    cityOne: {
        city: City,
        color: string
    },
    cityTwo: {
        city: City,
        color: string
    },
    editRouteDisabled?: boolean,
    deleteRouteDisabled?: boolean,
    editRouteFunc: IdFunc,
    deleteRouteFunc: IdFunc,
    id: string,
    headers: string[],
    values: string[]

    arrowColors?: {
        toCityOne: string,
        toCityTwo: string
    }
};


/**
 * Component to display an active route and its current state
 */
const metaRoute: Functional<MetaRouteProps> = (
    props: MetaRouteProps
): JSX.Element => (
    <div className={Styles.MetaRoute} style={props.style}>
        <div className={Styles.BuildQueueCities}>
            <p style={{color: props.cityOne.color}}>{props.cityOne.city.name}</p>
            <Arrows 
                arrows={[
                    {
                        arrowDirection: ArrowDirection.Left,
                        style: {
                            color: props.arrowColors?.toCityOne || '#ccc'
                        }
                    },
                    {
                        arrowDirection: ArrowDirection.Right,
                        style: {
                            color: props.arrowColors?.toCityTwo || '#ccc',
                            marginBottom: '30px'
                        }
                    }
                ]}
            />
            <p style={{color: props.cityTwo.color}}>{props.cityTwo.city.name}</p>
        </div>
        <div className={Styles.BuildQueueInfo}>
            {props.headers.map((header: string, index: number): JSX.Element => (
                <p 
                    key={index}
                    style={{textDecoration: 'underline', textDecorationColor: 'white'}}
                >
                    {header.toUpperCase()}
                </p>
            ))}
        </div>
        <div className={Styles.BuildQueueInfo}>
            {props.values.map((value: string, index: number): JSX.Element => (
                <p 
                    key={index}
                    style={{color: '#ccc'}}
                >
                    {value.toUpperCase()}
                </p>
            ))}
        </div>
        {props.deleteRouteDisabled && props.editRouteDisabled ? null :
        <div className={Styles.Buttons}>
            <hr/>
            <Button 
                buttonType={ButtonType.ManipulateRoute} 
                disabled={typeof props.editRouteDisabled !== 'undefined' ? props.editRouteDisabled : true} 
                whenClicked={() => props.editRouteFunc(props.id)} 
            >
                EDIT
            </Button>
            <Button 
                buttonType={ButtonType.ManipulateRoute} 
                disabled={typeof props.deleteRouteDisabled !== 'undefined' ? props.deleteRouteDisabled : true} 
                whenClicked={() => props.deleteRouteFunc(props.id)}
            >
                DELETE
            </Button>
        </div>}
    </div>
);


export default metaRoute;