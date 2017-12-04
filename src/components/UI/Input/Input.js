import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case 'input':
            inputElement =
                <input className={inputClasses.join(' ')}
                       type="text"
                       onChange={props.inputHandler}
                       {...props.elementConfig} value={props.value}/>;
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')}
                                     onChange={props.inputHandler}
                                     {...props.elementConfig} value={props.value}/>;
            break;
        case 'select':
            inputElement = <select className={inputClasses.join(' ')} onChange={props.inputHandler} value={props.value}>
                {props.elementConfig.options.map(item => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                                  type="text" {...props.elementConfig}
                                  onChange={props.inputHandler}
                                  value={props.value}/>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;