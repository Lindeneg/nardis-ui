import { ChangeEvent } from 'react';

import { InputType } from './inputType';


export type TInputChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

export interface IInputConfig {
    type: string,
    placeholder: string,
    selectOptions?: {
        value: string,
        displayValue: string
    }[],
    label?: string,
    inputType?: InputType
}

export default interface IInputProps {
    changed: (event: TInputChangeEvent) => void,
    key: string,
    inputConfig: IInputConfig,
    value: string,
    touched: boolean,
    valid: boolean,
    label?: string,
    inputType?: InputType
}