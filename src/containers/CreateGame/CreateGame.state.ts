import { 
    InputConfig 
} from '../../components/Utility/Input/Input.props';


export interface CreateGameInputConfig {
    inputConfig  : InputConfig,
    validation   : (value: string) => boolean,
    valid        : boolean,
    touched      : boolean,
    value        : string
}

export interface BaseState {
    [key: string]: CreateGameInputConfig,
    name         : CreateGameInputConfig,
    startMoney   : CreateGameInputConfig,
    opponents    : CreateGameInputConfig,
}


export default interface CreateGameState {
    [key: string]: BaseState | boolean,
    base         : BaseState,
    isValid      : boolean
}