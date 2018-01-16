import React, {Component} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    addIngredientHandler = (type) => {
        const ingredients = this.state.ingredients;
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients
        };
        updatedIngredients[type] = updatedCount;

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

        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = () => {
        const ingredients = this.props.ings;
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((prev, next) => prev + next, 0);

            return sum > 0
    };

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState(prevState => ({purchasing: !prevState.purchasing}));
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    continuePurchase = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const props = this.props;
        const state = this.state;
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1
        }

        let burger = props.error ? <p style={{textAlign: "center"}}>Ingredients can't be loaded</p> : <Spinner/>;
        let orderSummary;

        if (this.props.ings) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={props.ings}/>
                    <BuildControls ingredientAdded={props.onIngredientAdded}
                                   ingredientRemoved={props.onIngredientRemoved}
                                   disabled={disabledInfo}
                                   purchasable={this.updatePurchaseState()}
                                   totalPrice={props.totalPrice}
                                   ordered={this.purchaseHandler}
                                   isAuthenticated={props.isAuthenticated}
                    />
                </React.Fragment>
            );

            orderSummary = <OrderSummary ingredients={props.ings}
                                         continuePurchase={this.continuePurchase}
                                         closePurchase={this.purchaseHandler}
                                         totalPrice={props.totalPrice}/>;

            if (props.loading) {
                orderSummary = <Spinner/>;
            }
        }

        return (
            <React.Fragment>
                {burger}

                <Modal show={state.purchasing} close={this.purchaseHandler}>
                    {orderSummary}
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch( actions.addIngredient(ingName) ),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseBurgerStart()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));