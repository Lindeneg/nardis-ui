import { Fragment } from "react";

import { City, PotentialRoute, Train, Upgrade } from "nardis-game";

import TwoWayRoute from '../../../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import Cards from '../../../../../components/Information/Cards/Cards';
import { ChosenTrain } from "../../NewRoute";
import { Functional, Props } from "../../../../../common/props";
import { cardDefaultStyle } from "../../../../../common/constants";
import getTrainUpgradeContext, { TrainUpgradeContext } from "../../../../Helpers/getUpgradeContext";


interface OverviewProps extends Props {
    chosenRoute: PotentialRoute | null,
    chosenTrain: ChosenTrain,
    startCity  : City | null,
    upgrades   : Upgrade[]
};

const style = cardDefaultStyle;


/**
 * Component to display information of the current (potential) route chosen.
 */
const overview: Functional<OverviewProps> = (
    props: OverviewProps
): JSX.Element => {
    const train: Train | null = props.chosenTrain.train;
    const cost: number = (props.chosenRoute?.goldCost || 0) + (train?.cost || 0);
    const twoWayRoute: JSX.Element = <TwoWayRoute 
        cityOne={{city: props.chosenRoute ? props.chosenRoute.cityOne : props.startCity, routeCargo: props.chosenTrain.routePlanCargo?.cityOne || null}}
        cityTwo={{city: props.chosenRoute ? props.chosenRoute.cityTwo : null, routeCargo: props.chosenTrain.routePlanCargo?.cityTwo || null}}
    />;
    const trainUpgradeContext: TrainUpgradeContext = getTrainUpgradeContext(train?.speed || 0, train?.upkeep || 0, props.upgrades);
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
                    {label: 'SPEED', value: trainUpgradeContext.speed + 'KM/TURN', style},
                    {label: 'UPKEEP', value: trainUpgradeContext.upkeep + 'G/TURN', style}
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