import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { LocalKey, localKeys } from 'nardis-game';

import Button from '../../../components/Utility/Button/Button';
import Styles from './CreateGame.module.css';
import Input, { InputConfig } from '../../../components/Utility/Input/Input';
import { NardisAction } from '../../../common/actions';
import { ButtonType } from '../../../common/constants';
import {  
    Func, 
    Props,
    Indexable,
    FormEvent, 
    OnDispatch, 
    MapDispatch, 
    OnFormEventFunc,
    ChangedEventElement,
    OnFormChangeFunc, 
} from '../../../common/props';


export type InitGameFunc = (name: string, money: number, opponents: number) => void;

interface MappedProps {
    initGame     : InitGameFunc
}

interface CreateGameInputConfig {
    inputConfig  : InputConfig,
    validation   : Func<string, boolean>,
    valid        : boolean,
    touched      : boolean,
    value        : string
};

interface BaseState extends Indexable<CreateGameInputConfig> {
    name         : CreateGameInputConfig,
    startMoney   : CreateGameInputConfig,
    opponents    : CreateGameInputConfig,
};

interface CreateGameState extends Indexable<BaseState | boolean> {
    base         : BaseState,
    isValid      : boolean
};

interface CreateGameProps extends Props, MappedProps {};


const mapDispatchToProps: MapDispatch<MappedProps> = (
    dispatch: OnDispatch
): MappedProps => (
    {
        initGame: (name: string, money: number, opponents: number) => dispatch(
            {
                type: NardisAction.INITIALIZE_GAME,
                payload: {
                    initGame: {
                        name,
                        money,
                        opponents
                    }
                }
            }
        )
    }
);


/**
 * Component to start a new game with a few changeable parameters.
 */
class CreateGame extends Component<CreateGameProps, CreateGameState> {

    state: CreateGameState = {
        base: {
            name: {
                inputConfig: {
                    type: 'text',
                    label: 'Name',
                    placeholder: 'Miles Davis'
                },
                validation: (inp: string): boolean => {
                    const length: number = inp.length;
                    return length >= 2 && length <= 11;
                },
                valid: true,
                touched: false,
                value: 'Miles Davis'
            },
            startMoney: {
                inputConfig: {
                    type: 'number',
                    label: 'Money',
                    placeholder: '1000'
                },
                validation: (inp: string): boolean => {
                    const value: number = parseInt(inp);
                    return !Number.isNaN(value) && value >= 800 && value < 3501;
                },
                valid: true,
                touched: false,
                value: '1000'
            },
            opponents: {
                inputConfig: {
                    type: 'number',
                    label: 'Opponents',
                    placeholder: '2'
                },
                validation: (inp: string): boolean => {
                    const value: number = parseInt(inp);
                    return !Number.isNaN(value) && value >= 1 && value < 5;
                },
                valid: true,
                touched: false,
                value: '2'
            }
        },
        isValid: true
    };

    componentDidMount = (): void => {
        if (!!window.localStorage[localKeys[LocalKey.HasActiveGame]]) {
            this.props.initGame('', 0, 0);
        }
    }

    onChangeHandler: OnFormChangeFunc<string> = (
        event: ChangedEventElement, 
        key  : string
    ): void => {
        const base: BaseState = { ...this.state.base };
        const newTargetState: CreateGameInputConfig = { ...base[key] };

        newTargetState.touched = true;
        newTargetState.value = event.target.value;
        newTargetState.valid = newTargetState.validation(event.target.value);
        base[key] = newTargetState;

        let isValid: boolean = true;
        for (let key in base) {
            isValid = base[key].valid && isValid;
        }

        this.setState({base, isValid});   
    }

    initGame: OnFormEventFunc = (
        event: FormEvent
    ): void => {
        event.preventDefault();
        this.props.initGame(
            this.state.base.name.value, 
            parseInt(this.state.base.startMoney.value), 
            parseInt(this.state.base.opponents.value)
        );
    }

    render (): JSX.Element {
        return (
            <Fragment>
                <div className={Styles.Intro}>
                    <h1>
                        NARDIS
                    </h1>
                    <h3>
                        A TURN-BASED TRADING GAME
                    </h3>
                </div>
                <div className={Styles.CreateGame}>
                    <form onSubmit={this.initGame}>
                        {Object.keys(this.state.base)
                        .map((key: string): JSX.Element => {
                            const entry: CreateGameInputConfig = this.state.base[key];
                            return (
                                <Input 
                                    key={key}
                                    changed={(event: ChangedEventElement) => this.onChangeHandler(event, key)}
                                    inputConfig={entry.inputConfig}
                                    value={entry.value}
                                    touched={entry.touched}
                                    valid={entry.valid}
                                />
                            );
                        })}
                        <Button 
                            whenClicked={() => null} 
                            disabled={!this.state.isValid} 
                            buttonType={ButtonType.CreateGame} >
                                START GAME
                        </Button>
                    </form>
                </div>
            </Fragment>
        );
    }
};


export default connect(null, mapDispatchToProps)(CreateGame);