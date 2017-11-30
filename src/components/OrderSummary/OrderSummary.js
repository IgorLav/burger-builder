import React from 'react';
import Aux from '../../hoc/Auxiliary';
import Button  from '../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(key => (
            <li key={key + props.ingredients[key]}>
                <span style={{textTransform: 'capitalize'}}>{key}:</span> {props.ingredients[key]}
            </li>
        ));

    return (
        <Aux>
            <h3>Your order</h3>
            <p>A delicious burger with a following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Total price: <strong>{props.totalPrice.toFixed()} $</strong></p>
            <p>Continue to Checkout?</p>

            <Button clicked={props.closePurchase} btnType="Danger">Cancel</Button>
            <Button clicked={props.continuePurchase} btnType="Success">Continue</Button>
        </Aux>
    )
};

export default orderSummary;