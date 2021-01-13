import { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Styles from './Modal.module.css';
import { Clickable, Functional, OnClickFunc, Props } from '../../../common/props';


interface ModalProps extends Props, Clickable<OnClickFunc> {
    show: boolean,
};


/**
 * Modal component animated when visibility change.
 */
const modal: Functional<ModalProps> = (
    props: ModalProps
): JSX.Element => (
    <Fragment>
        <Backdrop {...props} />
        <div
            className={Styles.Modal}
            style={{
                ...props.style,
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </Fragment>
);


export default modal;