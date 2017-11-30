import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key}/>
            });
        })
        .filter(item => item.length > 0);

    const infoMsg = ingredients.length === 0 ? <p>Please start adding your ingredients</p> : null;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            { ingredients }
            { infoMsg }
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
};

export default burger;