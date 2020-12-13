import { Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';
import ModalProps from './Modal.props';


const modal = (props: ModalProps): JSX.Element => (
    <Fragment>
        <Backdrop show={props.show} clicked={props.onClose} />
        <div
            className={styles.Modal}
            style={
                {
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }
            }
        >
            {props.children}
        </div>
    </Fragment>
)

export default modal;