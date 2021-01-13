import { IdFunc, Props } from "../../../../../common/props";
import Button from '../../../../../components/Utility/Button/Button';
import Modal from '../../../../../components/Utility/Modal/Modal';
import { ButtonType } from "../../../../../common/constants";
import Styles from './DeleteModal.module.css';


interface DeleteModalProps extends Props {
    show: boolean,
    onDelete: IdFunc,
    id: string,
    value: number
};


const deleteModal = (props: DeleteModalProps): JSX.Element => (
    <Modal
        show={props.show}
        whenClicked={props.onDelete.bind(null, '')}
        style={{backgroundColor: 'navy', overflow: 'unset'}}
    >
        <div className={Styles.DeleteModal}>
            <p>RECOUP <span className={Styles.DeleteModalValue}>{props.value}G</span> FROM ROUTE</p>
            <Button
                disabled={false}
                whenClicked={props.onDelete.bind(null, props.id)}
                buttonType={ButtonType.Success}
            >
                CONFIRM
            </Button>
            <Button
                disabled={false}
                whenClicked={props.onDelete.bind(null, '')}
                buttonType={ButtonType.Danger}
            >
                CANCEL
            </Button>
        </div>
    </Modal>
);


export default deleteModal;