import Button from '../../../components/Utility/Button/Button';
import Modal, { ModalProps } from '../../../components/Utility/Modal/Modal';
import { Functional, Props } from '../../../common/props';
import { ButtonType } from '../../../common/constants';


interface BoughtOutModal extends Props, ModalProps {
    onEndGame: () => void
};


const boughtOutModal: Functional<BoughtOutModal> = (props: BoughtOutModal): JSX.Element => (
    <Modal 
        show={props.show}
        whenClicked={props.whenClicked}
        style={{overflowY: 'unset', textAlign: 'center', backgroundColor: 'navy', color: 'white'}}
    > 
        YOU HAVE BEEN BOUGHT OUT. GAME OVER.
        <Button
            disabled={false}
            whenClicked={props.whenClicked}
            buttonType={ButtonType.StandardView}
            style={{margin: '15px 0 15px 0'}}
        >
            CONTINUE GAME
        </Button>
        <Button
            disabled={false}
            whenClicked={props.onEndGame}
            buttonType={ButtonType.StandardView}
        >
            NEW GAME
        </Button>
    </Modal>
);


export default boughtOutModal;