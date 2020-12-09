import { 
    IInputConfig 
} from '../../components/Utility/Input/Input.props';


export interface ICreateGameInputConfig {
    inputConfig  : IInputConfig,
    validation   : (value: string) => boolean,
    valid        : boolean,
    touched      : boolean,
    value        : string
}

export interface IBaseState {
    [key: string]: ICreateGameInputConfig,
    name         : ICreateGameInputConfig,
    startMoney   : ICreateGameInputConfig,
    opponents    : ICreateGameInputConfig,
}


export default interface ICreateGameState {
    [key: string]: IBaseState | boolean,
    base         : IBaseState,
    isValid      : boolean
}