import { InputType } from './inputType';
import { Changeable, Functional, Props } from '../../../common/props';
import styles from './Input.module.css';


interface Shared {
    label?: string,
    inputType?: InputType
};

export interface InputConfig extends Shared {
    type: string,
    placeholder: string,
    selectOptions?: {
        value: string,
        displayValue: string
    }[],
};

interface InputProps extends Props, Shared, Changeable {
    key: string,
    inputConfig: InputConfig,
    value: string,
    touched: boolean,
    valid: boolean,
};


/**
 * Input component supporting three elements: input, select and textarea.
 */
const input: Functional<InputProps> = (
    props: InputProps
): JSX.Element => {
    const classes: string = [styles.InputElement, !props.valid && props.touched ? styles.Invalid : null].join(' ');
    let element: JSX.Element = (
        <input 
            onChange={props.changed} 
            className={classes} 
            value={props.value}
            {...props.inputConfig}
        />
    );

    if (!(typeof props.inputType === 'undefined')) {
        switch (props.inputType) {
            case InputType.SELECT:
                element = (
                    <select 
                        onChange={props.changed}
                        className={classes} 
                        value={props.value}>
                        {(props.inputConfig.selectOptions ? props.inputConfig.selectOptions : []).map(option => (
                            <option key={option.value} value={option.value}>{option.displayValue}</option>
                        ))}
                    </select>
                );
                break;
            case InputType.TEXTAREA:
                element = (
                    <textarea 
                        onChange={props.changed} 
                        className={classes} 
                        value={props.value}
                        {...props.inputConfig} 
                    />
                );
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.inputConfig.label}</label>
            {element}
        </div>
    );
};


export default input;