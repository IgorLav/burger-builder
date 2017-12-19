import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)} $</strong></p>

        { controls.map(cntrl => (
            <BuildControl
                key={cntrl.label}
                label={cntrl.label}
                added={() => props.ingredientAdded(cntrl.type)}
                removed={() => props.ingredientRemoved(cntrl.type)}
                disabled={props.disabled[cntrl.type]}
            />
        ))}

        <button className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
        >
            {props.isAuthenticated ? ' Order now' : 'Sign up to order'}
        </button>
    </div>
);

export default buildControls;