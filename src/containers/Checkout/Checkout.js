import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state= {
        ingredients: {
            salad: 1,
            bacon: 1
        }
    };

    checkoutCanceled = () => {
        this.props.history.goBack();
    };

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div className="">
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutContinue={this.checkoutContinue}
                                 checkoutCanceled={this.checkoutCanceled} />
            </div>
        );
    }
}