import React from 'react';
import classes from './Order.css';

const order = (props) => {
    let ingredients = props.ingredients;
    const ingredientStyle = {
        textTransform: 'capitalize',
        display: 'inline-block',
        marginRight: 5,
        padding: '3px 15px',
        border: '1px solid #dedede'
    };

    const ingredientsOutput = Object.keys(ingredients)
        .map(key => ({name: [key], amount: props.ingredients[key]}))
        .filter(item => item.amount > 0)
        .map(item => (
            <span key={item.name} style={ingredientStyle}>{item.name} <strong>({item.amount})</strong></span>)
        );

    return (
        <div className={classes.Order}>
            <p>Ingrediendt: {ingredientsOutput} </p>
            <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
        </div>
    )
};

export default order;