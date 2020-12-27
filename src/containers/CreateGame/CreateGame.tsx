import { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Input, { InputConfig } from '../../components/Utility/Input/Input';
import Button from '../../components/Utility/Button/Button';
import { ButtonType } from '../../components/Utility/Button/buttonType';
import { NardisAction } from '../../common/state';
import {  
    Func, 
    Props,
    Indexable,
    FormEvent, 
    OnDispatch, 
    MapDispatch, 
    OnFormEventFunc,
    ChangedEventElement, 
} from '../../common/props';
import styles from './CreateGame.module.css';


type InitGameFunc = (name: string, money: number, opponents: number) => void; 

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

interface CreateGameProps extends Props {
    initGame     : InitGameFunc
};


/**
 * 
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
                    label: 'Money (TODO does nothing atm)',
                    placeholder: '800' //'min 800, max 3500'
                },
                validation: (inp: string): boolean => {
                    const value: number = parseInt(inp);
                    return !Number.isNaN(value) && value >= 800 && value < 3501;
                },
                valid: true, //false,
                touched: false,
                value: ''
            },
            opponents: {
                inputConfig: {
                    type: 'number',
                    label: 'Opponents (TODO does nothing atm)',
                    placeholder: '3' //'min 1, max 4'
                },
                validation: (inp: string): boolean => {
                    const value: number = parseInt(inp);
                    return !Number.isNaN(value) && value >= 1 && value < 5;
                },
                valid: true, // false,
                touched: false,
                value: ''
            }
        },
        isValid: true //false
    };

    onChangeHandler = (event: ChangedEventElement, key: string): void => {
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

    initGame: OnFormEventFunc = (event: FormEvent): void => {
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
                <div className={styles.CreateGame}>
                    <form onSubmit={this.initGame}>
                        {
                            Object.keys(this.state.base)
                            .map((key: string) => {
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
                            })
                        }
                        <Button 
                            whenClicked={() => null} 
                            disabled={!this.state.isValid} 
                            buttonType={ButtonType.CREATE_GAME} >
                                Start Game
                        </Button>
                    </form>
                </div>
                <footer>Footer</footer>
            </Fragment>
        );
    }
};


const mapDispatchToProps: MapDispatch<{initGame: InitGameFunc}> = (dispatch: OnDispatch): {initGame: InitGameFunc} => (
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


export default connect(null, mapDispatchToProps)(CreateGame);