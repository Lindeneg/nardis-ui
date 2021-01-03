import { connect } from 'react-redux';

import NavigationEntry from './NavigationEntry/NavigationEntry';
import Button from '../../Utility/Button/Button';
import Styles from './NavigationEntries.module.css';
import { ButtonType } from '../../../common/constants';
import { NardisAction } from '../../../common/actions';
import { Functional, MapDispatch, OnDispatch, Props, RouterRouteLinkProps } from '../../../common/props';


interface Entry extends RouterRouteLinkProps {
    content            : string
};

interface MappedProps {
    endTurn            ?: () => void,
    toggleLoading      ?: () => void
};

export interface NavigationEntriesProps extends Props, MappedProps {
    entries             : Entry[],
    showEndTurnButton   : boolean
};


const sleep = (ms: number): Promise<any> => {
    if (ms <= 0) { new Promise(() => null); }
    return new Promise(resolve => setTimeout(resolve, ms));
}

const mapDispatchToProps: MapDispatch<MappedProps> = (
    dispatch: OnDispatch
): MappedProps => (
    {
        endTurn: () => dispatch(
            {
                type: NardisAction.END_PLAYER_TURN,
                payload: {}
            }
        ),
        toggleLoading: () => dispatch(
            {
                type: NardisAction.TOGGLE_LOADING,
                payload: {}
            }
        )
    }
);


/**
 * Wrapper to capture a list of NavigationEntry components.
 */
const navigationEntries: Functional<NavigationEntriesProps> = (
    props: NavigationEntriesProps
): JSX.Element => {
    const btnFunc = async () => {
        if (props.toggleLoading && props.endTurn) {
            const startTime = new Date().getTime();
            props.toggleLoading();
            props.endTurn();
            await sleep(1000 - (new Date().getTime() - startTime));
            props.toggleLoading();

        }
    }
    return (
        <ul style={props.style} className={Styles.NavigationEntries}>
            {props.entries.map((entry: Entry, index: number): JSX.Element => (
                <NavigationEntry 
                    key={index}
                    link={entry.link}
                    style={entry.style}
                    active={entry.active}
                    exact={entry.exact}
                >
                    {entry.content} 
                </NavigationEntry>))}
            {props.showEndTurnButton ?
                <Button 
                    style={{paddingTop: "5px"}} 
                    whenClicked={btnFunc} 
                    disabled={false} 
                    buttonType={ButtonType.EndTurn}
                > 
                        NEXT TURN
                </Button> : null}
        </ul>
    );
}


export default connect(null, mapDispatchToProps)(navigationEntries);