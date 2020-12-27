import { Fragment } from "react";

import { Functional, Props } from "../../../../../common/props";
import Button, { ButtonProps } from '../../../../../components/Utility/Button/Button';


export interface SelectorProp {
    props: ButtonProps,
    content: string
}

interface SelectorProps extends Props {
    buttons: SelectorProp[]
}


/**
 * 
 */
const citySelector: Functional<SelectorProps> = (
    props: SelectorProps
): JSX.Element => (
    <Fragment>
        {props.buttons.map((e, i) => (
            <Button
                key={i}
                {...e.props}
            >
                {e.content}    
            </Button>
        ))}
    </Fragment>
);


export default citySelector;