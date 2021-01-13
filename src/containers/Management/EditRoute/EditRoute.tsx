import { CSSProperties, Fragment } from "react";

import { Route, RoutePlanCargo, Train } from "nardis-game";

import Button from '../../../components/Utility/Button/Button';
import Cards from '../../../components/Information/Cards/Cards';
import TwoWayRoute from '../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import CargoSelector from '../NewRoute/Helpers/Selector/CargoSelector';
import getMetaRoute from "../ManageRoute/getMetaRoute";
import Styles from './EditRoute.module.css';
import { ButtonType, cardDefaultStyle } from "../../../common/constants";
import { getCargoCards } from "../NewRoute/Helpers/Selector/getCargoCards";


interface EditRouteProps {
    route   : Route[],
    onCancel: () => void
};

const style: CSSProperties = cardDefaultStyle;


/**
 * 
 */
const editRoute = (props: EditRouteProps) => {

    let jsx: JSX.Element = <p>NO ROUTE TO EDIT</p>;

    if (props.route.length > 0) {
        const route: Route = props.route[0];
        const train: Train = route.getTrain(); const routePlan: RoutePlanCargo = route.getRoutePlan();
        const cargoCards = getCargoCards(routePlan.cityOne, routePlan.cityTwo, train.cargoSpace, () => null, () => null, [], props.route)

        jsx = (
            <div className={Styles.EditRouteContent}>
                <div className={Styles.RouteState}>
                    {getMetaRoute({
                        route,
                        editDisabled: true,
                        deleteDisabled: true,
                        onEdit: () => null,
                        onDelete: () => null,
                        style: {
                            border: 'none',
                            width: '50%',
                            margin: '0'
                        }
                    })}
                </div>
                <hr/>
                {cargoCards.first && cargoCards.second ?
                <Fragment>
                <TwoWayRoute 
                    cityOne={{city: route.getCityOne(), routeCargo: routePlan.cityOne}}
                    cityTwo={{city: route.getCityTwo(), routeCargo: routePlan.cityTwo}}
                />
                <CargoSelector 
                    first={cargoCards.first}
                    second={cargoCards.second}
                /> </Fragment>: null}
                <Cards 
                    cards={[
                        {label: 'TRAIN', value: train.name, style},
                        {label: 'CARGO SPACE', value: train.cargoSpace + 'T', style},
                        {label: 'UPKEEP', value: train.upkeep + 'G/TURN', style},
                        {label: 'SPEED', value: train.speed + 'KM/TURN', style},
                        {label: 'LEVEL', value: train.levelRequired.toString(), style},
                    ]}
                    style={{margin: 0}}
                />
                <Button 
                    disabled={false} 
                    buttonType={ButtonType.SetTrain} 
                    whenClicked={() => null}
                    style={{marginBottom: '10px', marginTop: '10px'}}
                >
                    CHANGE TRAIN
                </Button>
            </div>
        )
    }



    return (
        <div className={Styles.EditRoute}>
            <Button 
                disabled={false} 
                buttonType={ButtonType.EditRouteConfirm} 
                whenClicked={() => null}
            >
                CONFIRM EDIT
            </Button>
            <Button 
                disabled={false} 
                buttonType={ButtonType.EditRouteCancel} 
                whenClicked={props.onCancel}
            >
                CANCEL EDIT
            </Button>
            <hr/>
            {jsx}
        </div>
    );
}


export default editRoute;