import { ChangeEvent } from 'react';

import { InputType } from './inputType';


export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

export interface InputConfig {
    type: string,
    placeholder: string,
    selectOptions?: {
        value: string,
        displayValue: string
    }[],
    label?: string,
    inputType?: InputType
}

export default interface InputProps {
    changed: (event: InputChangeEvent) => void,
    key: string,
    inputConfig: InputConfig,
    value: string,
    touched: boolean,
    valid: boolean,
    label?: string,
    inputType?: InputType
}