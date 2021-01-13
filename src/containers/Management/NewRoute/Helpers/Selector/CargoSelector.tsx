import { Fragment } from "react";

import Cards, { CardsProps } from '../../../../../components/Information/Cards/Cards';
import Button, { ButtonProps } from '../../../../../components/Utility/Button/Button';
import { Functional, Props } from "../../../../../common/props";


export interface Selection {
    header: CardsProps,
    cargo: CardsProps
};

interface CargoSelectorProps extends Props {
    first: Selection
    second: Selection
    changeTrainButton?: ButtonProps,
    buyRouteButton?: ButtonProps
};


/**
 * 
 */
const cargoSelector: Functional<CargoSelectorProps> = (
    props: CargoSelectorProps
): JSX.Element => (
    <Fragment>
        {props.changeTrainButton ? 
        <Button {...props.changeTrainButton} >
            CHANGE TRAIN
        </Button> : null}
        <hr/>
        <Cards {...props.first.header} />
        <hr/>
        <Cards {...props.first.cargo} />
        <hr/>
        <Cards {...props.second.header} />
        <hr/>
        <Cards {...props.second.cargo} />
        <hr/>
        {props.buyRouteButton ?
        <Button {...props.buyRouteButton} >
            BUY ROUTE
        </Button> : null}
    </Fragment>
);


export default cargoSelector;