import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 2,
    cheese: 1.5,
    meat: 3
};

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    addIngredientHandler = (type) => {
        const ingredients = this.state.ingredients;
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        this.setState({
            totalPrice: oldPrice + priceAddition,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const ingredients = this.state.ingredients;
        const oldCount = ingredients[type];

        if (oldCount < 1)  return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;

        this.setState({
            totalPrice: oldPrice - priceDeduction,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce( (prev, next) => prev + next, 0);

        this.setState({
            purchasable: sum > 0
        });
    };

    purchaseHandler = () => {
         this.setState(prevState => ({ purchasing: !prevState.purchasing }));
    };

    continuePurchase = () => {
        alert('You continue!');
    };

    render() {
        const state = this.state;
        const disabledInfo = {
            ...state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        return (
            <Aux>
                <Burger ingredients={state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={state.purchasable}
                    totalPrice={state.totalPrice}
                    ordered={this.purchaseHandler}
                />

                <Modal show={state.purchasing} close={this.purchaseHandler}>
                    <OrderSummary ingredients={state.ingredients}
                        continuePurchase={this.continuePurchase}
                        closePurchase={this.purchaseHandler}
                        totalPrice={state.totalPrice}
                    />
                </Modal>
            </Aux>
        );
    }
}