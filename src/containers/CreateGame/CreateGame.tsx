import { Component, FormEvent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import CreateGameState, { ICreateGameInputConfig, IBaseState } from './CreateGame.state';
import Input from '../../components/Utility/Input/Input';
import Button from '../../components/Utility/Button/Button';
import { ButtonType } from '../../components/Utility/Button/buttonType';
import { TInputChangeEvent } from '../../components/Utility/Input/Input.props';
import { NardisAction, IReducerAction } from '../../common/state';
import CreateGameProps, { TInitGame } from './CreateGame.props';
import styles from './CreateGame.module.css';


class CreateGame extends Component<CreateGameProps> {

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
                    return length >= 2 && length < 11;
                },
                valid: true,
                touched: false,
                value: 'Miles Davis'
            },
            startMoney: {
                inputConfig: {
                    type: 'number',
                    label: 'Money',
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
                    label: 'Opponents',
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

    componentDidMount = () => {
        console.log(this.props);
    }

    onChangeHandler = (event: TInputChangeEvent, key: string): void => {
        const base: IBaseState = { ...this.state.base };
        const newTargetState: ICreateGameInputConfig = { ...base[key] };

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

    initGame = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        this.props.initGame(
            this.state.base.name.value, 
            parseInt(this.state.base.startMoney.value), 
            parseInt(this.state.base.opponents.value)
        );
    }

    render (): JSX.Element {
        return (
            <div className={styles.CreateGame}>
                <form onSubmit={this.initGame}>
                    {
                        Object.keys(this.state.base)
                        .map((key: string) => {
                            const entry: ICreateGameInputConfig = this.state.base[key];
                            return (
                                <Input 
                                    key={key}
                                    changed={(event: TInputChangeEvent) => this.onChangeHandler(event, key)}
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
                        buttonType={ButtonType.SUCCESS} >
                            Start Game
                    </Button> 
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IReducerAction>): {initGame: TInitGame} => {
    return {
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
};

export default connect(null, mapDispatchToProps)(CreateGame);