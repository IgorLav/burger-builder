import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
      <div className={classes.CheckoutSummary}>
          <h1>We hope it tastes well</h1>
          <div className="" >
              <Burger ingredients={props.ingredients}/>

              <Button btnType="Danger" clicked={props.checkoutCanceled}>Cancel</Button>
              <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
          </div>
      </div>
    );
};

export default checkoutSummary;