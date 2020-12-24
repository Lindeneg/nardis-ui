import { Fragment } from "react";

import TwoWayRoute from '../../../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import Cards from '../../../../../components/Information/Cards/Cards';
import { City, PotentialRoute, Train } from "nardis-game";
import { IChosenTrain } from "../../NewRoute.state";


interface Props {
    chosenRoute: PotentialRoute | null,
    chosenTrain: IChosenTrain,
    startCity: City | null
}

const style = {margin: '0'};

const overview = (props: Props): JSX.Element => {
    const train: Train | null = props.chosenTrain.train;
    const cost: number = (props.chosenRoute?.goldCost || 0) + (train?.cost || 0);
    const twoWayRoute: JSX.Element = <TwoWayRoute 
        cityOne={{city: props.chosenRoute ? props.chosenRoute.cityOne : props.startCity, routeCargo: props.chosenTrain.routePlanCargo?.cityOne || null}}
        cityTwo={{city: props.chosenRoute ? props.chosenRoute.cityTwo : null, routeCargo: props.chosenTrain.routePlanCargo?.cityTwo || null}}
    />;
    const cards: JSX.Element = (
        <div>
            <hr/>
            <Cards 
                style={style}
                cards={[
                    {label: 'DISTANCE', value: (props.chosenRoute?.distance || 0) + 'KM', style},
                    {label: 'GOLD COST', value: cost + 'G', style},
                    {label: 'TURN COST', value: (props.chosenRoute?.turnCost || 0) + '', style}
                ]}
            />
            <Cards 
                style={style}
                cards={[
                    {label: 'CHOSEN TRAIN', value: train?.name || '', style},
                    {label: 'SPEED', value: (train?.speed || 0) + 'KM/TURN', style},
                    {label: 'UPKEEP', value: (train?.upkeep || 0) + 'G/TURN', style}
                ]}
            />
        </div>
    );
    return (
        <Fragment>
            {twoWayRoute}
            {props.chosenRoute && props.chosenRoute.cityTwo !== null ? cards : null}
        </Fragment>
    );
}

export default overview;