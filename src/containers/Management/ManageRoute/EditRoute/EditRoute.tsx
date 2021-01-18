import { CSSProperties, Fragment } from "react";

import { Route, RoutePlanCargo, Train } from "nardis-game";

import Button from '../../../../components/Utility/Button/Button';
import Cards from '../../../../components/Information/Cards/Cards';
import TwoWayRoute from '../../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import CargoSelector from '../../NewRoute/Helpers/Selector/CargoSelector';
import getMetaRoute from "..//Helpers/getMetaRoute";
import Styles from './EditRoute.module.css';
import { ButtonType, cardDefaultStyle, ListType } from "../../../../common/constants";
import { getCargoCards } from "../../NewRoute/Helpers/Selector/getCargoCards";
import { CargoChange } from "../../NewRoute/NewRoute";
import { IdFunc, PossibleTrain } from "../../../../common/props";
import Modal from '../../../../components/Utility/Modal/Modal';
import ListItems from '../../../../components/Information/ListItems/ListItems';


interface EditRouteProps {
    route        : Route[],
    possibleTrains: PossibleTrain[],
    train        : Train | null,
    editCost     : number,
    routePlan    : RoutePlanCargo | null,
    changingTrain: boolean,
    onCancel     : () => void,
    modalOpen    : () => void,
    modalClose   : () => void,
    onCargoAdd   : CargoChange,
    onCargoRemove: CargoChange,
    onTrainChange: IdFunc
};


const style: CSSProperties = cardDefaultStyle;


/**
 * 
 */
const editRoute = (props: EditRouteProps) => {

    let jsx: JSX.Element = <p>NO ROUTE TO EDIT</p>;

    if (props.route.length > 0) {
        const route: Route = props.route[0];
        const train: Train = props.train ? props.train : route.getTrain(); 
        const routePlan: RoutePlanCargo = props.routePlan ? props.routePlan : route.getRoutePlan();
        const cargoCards = getCargoCards(
            routePlan.cityOne, 
            routePlan.cityTwo, 
            train.cargoSpace, 
            props.onCargoAdd, 
            props.onCargoRemove, 
            [], 
            props.route
        );

        jsx = (
            <div className={Styles.EditRouteContent}>
                <div className={Styles.RouteState}>
                    {getMetaRoute({
                        route,
                        isEditing: true,
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
                    /> 
                </Fragment> : null}
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
                    whenClicked={() => props.modalOpen()}
                    style={{marginBottom: '10px', marginTop: '10px'}}
                >
                    CHANGE TRAIN
                </Button>
            </div>
        )
    }



    return (
        <div className={Styles.EditRoute}>
            <Modal
                show={props.changingTrain}
                whenClicked={() => props.modalClose()} 
            >
                <ListItems 
                    listType={ListType.Train}
                    whenClicked={props.onTrainChange}
                    content={{possibleTrains: props.possibleTrains}}
                    activeId={props.train?.id || ''} />
            </Modal>
            <Button 
                disabled={false} 
                buttonType={ButtonType.EditRouteConfirm} 
                whenClicked={() => null}
            >
                CONFIRM EDIT {!!props.editCost ? `(${props.editCost}G)` : ''}
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