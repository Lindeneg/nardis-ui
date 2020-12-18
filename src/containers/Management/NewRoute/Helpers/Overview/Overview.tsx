import { Fragment } from "react";

import Button from '../../../../../components/Utility/Button/Button';
import TwoWayRoute from '../../../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute';
import ITwoWayRouteProps from "../../../../../components/Information/MetaRoute/TwoWayRoute/TwoWayRoute.props";
import IButtonProps from "../../../../../components/Utility/Button/Button.props";
import Cards from '../../../../../components/Information/Cards/Cards';


interface Props {
    route: ITwoWayRouteProps,
    distance: number,
    cost: number,
    turnCost: number,
    button: IButtonProps
}

const style = {margin: '0'};

const overview = (props: Props): JSX.Element => (
    <Fragment>
        <TwoWayRoute {...props.route} />
        <Cards 
            style={{margin: '0'}}
            cards={[
                {label: 'DISTANCE', value: props.distance + 'KM', style},
                {label: 'GOLD COST', value: props.cost + 'G', style},
                {label: 'TURN COST', value: props.turnCost + '', style}
            ]}
        />
        <hr/>
        <Button {...props.button} >
                CHANGE TRAIN
        </Button>
        <hr/>
    </Fragment>
);

export default overview;