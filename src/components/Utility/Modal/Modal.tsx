import { Fragment } from 'react';

import { Clickable, OnClickFunc, Props } from '../../../common/props';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';


interface ModalProps extends Props, Clickable<OnClickFunc> {
    show: boolean,
};


/**
 * Modal component animated when visibility change.
 */
const modal = (props: ModalProps): JSX.Element => (
    <Fragment>
        <Backdrop {...props} />
        <div
            className={styles.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}
        >
            {props.children}
        </div>
    </Fragment>
);


export default modal;