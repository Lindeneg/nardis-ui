import { City } from "nardis-game";

import Button from '../../../components/Utility/Button/Button';
import { IdFunc, Functional, Props } from "../../../common/props";
import { ButtonType } from "../../../common/constants";
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


const metaRoute: Functional<MetaRouteProps> = (
    props: MetaRouteProps
): JSX.Element => (
    <div className={Styles.MetaRoute}>
        <div className={Styles.BuildQueueCities}>
            <p style={{color: props.cityOne.color}}>{props.cityOne.city.name}</p>

            {/*TODO make arrow utility component*/}
            <div className={Styles.Arrows}>
                <p style={{color: props.arrowColors?.toCityOne || '#ccc'}} className={Styles.Arrow}>&#8656;</p>
                <p style={{marginBottom: '30px', color: props.arrowColors?.toCityTwo || '#ccc'}} className={Styles.Arrow}>&#8658;</p>
            </div>

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
        <hr/>
        <div className={Styles.Buttons}>
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
        </div>
    </div>
);


export default metaRoute;