import { Fragment } from "react";
import Button from '../../../../../components/Utility/Button/Button';
import IButtonProps from "../../../../../components/Utility/Button/Button.props";


export interface ISelectorProp {
    props: IButtonProps,
    content: string
}

interface ISelectorProps {
    buttons: ISelectorProp[]
}

const Selector = (props: ISelectorProps): JSX.Element => (
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

export default Selector;