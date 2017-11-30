import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axiosInst from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 1,
    bacon: 2,
    cheese: 1.5,
    meat: 3
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axiosInst.get('/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            });
    }

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
            .reduce((prev, next) => prev + next, 0);

        this.setState({
            purchasable: sum > 0
        });
    };

    purchaseHandler = () => {
        this.setState(prevState => ({purchasing: !prevState.purchasing}));
    };

    continuePurchase = () => {
        this.setState({loading: true});

        const order = {
            ingridient: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'iLavs',
                address: {
                    street: "Shevchenko st. 222",
                    zipCode: 18000
                },
                deliveryMethod: 'fastest'
            }
        };

        axiosInst.post('orders.json', order)
            .then(res => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                console.log(err)
            })
    };

    render() {
        const state = this.state;
        const disabledInfo = {
            ...state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        let burger = state.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> : <Spinner/>;
        let orderSummary;

        if (state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={state.ingredients}/>
                    <BuildControls ingredientAdded={this.addIngredientHandler}
                                   ingredientRemoved={this.removeIngredientHandler}
                                   disabled={disabledInfo}
                                   purchasable={state.purchasable}
                                   totalPrice={state.totalPrice}
                                   ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={state.ingredients}
                                         continuePurchase={this.continuePurchase}
                                         closePurchase={this.purchaseHandler}
                                         totalPrice={state.totalPrice}/>;

            if (state.loading) {
                orderSummary = <Spinner/>;
            }
        }

        return (
            <Aux>
                {burger}

                <Modal show={state.purchasing} close={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder);