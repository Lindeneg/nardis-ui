import Cards, { CardsProps } from '../../../../../components/Information/Cards/Cards';

import Button from '../../../../../components/Utility/Button/Button';
import IButtonProps from "../../../../../components/Utility/Button/Button.props";

import { Fragment } from "react";


export interface ISelection {
    header: CardsProps,
    cargo: CardsProps
}

interface ICargoSelectorProps {
    first: ISelection
    second: ISelection
    changeTrainButton: IButtonProps,
    buyRouteButton: IButtonProps
}

const cargoSelector = (props: ICargoSelectorProps) => (
    <Fragment>
        <Button {...props.changeTrainButton} >
            CHANGE TRAIN
        </Button>
        <hr/>
        <Cards {...props.first.header} />
        <hr/>
        <Cards {...props.first.cargo} />
        <hr/>
        <Cards {...props.second.header} />
        <hr/>
        <Cards {...props.second.cargo} />
        <hr/>
        <Button {...props.buyRouteButton} >
            BUY ROUTE
        </Button>
    </Fragment>
)


export default cargoSelector;