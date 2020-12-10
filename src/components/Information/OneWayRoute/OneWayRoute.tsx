import { Fragment } from "react";

import Button from '../../Utility/Button/Button';
import CityRect from '../CityRect/CityRect';
import IButtonProps from "../../Utility/Button/Button.props";
import ICityRectProps from "../CityRect/CityRect.props";


interface Meta extends IButtonProps {
    content: string
}

interface Props {
    button: Meta,
    cityOne: ICityRectProps,
    cityTwo: ICityRectProps
}

const oneWayRoute = (props: Props) => (
    <Fragment>
        <Button {...props.button}>
            {props.button.content}
        </Button>
        <div style={{display: 'flex'}}>
            <CityRect {...props.cityOne} />
            <CityRect {...props.cityTwo} />
        </div>
    </Fragment>
)

export default oneWayRoute;