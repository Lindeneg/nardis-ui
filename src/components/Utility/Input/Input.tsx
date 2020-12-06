import InputProps from './Input.props';
import { InputType } from './inputType';

import styles from './Input.module.css';


const input = (props: InputProps): JSX.Element => {

    const tempClasses: string[] = [styles.InputElement];
    if (!props.valid && props.touched) { 
        tempClasses.push(styles.Invalid); 
    }

    const classes: string = tempClasses.join(' ');
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
                const selectors = props.inputConfig.selectOptions ? props.inputConfig.selectOptions : [];
                element = (
                    <select 
                        onChange={props.changed}
                        className={classes} 
                        value={props.value}>
                        {selectors.map(option => (
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
}

export default input;