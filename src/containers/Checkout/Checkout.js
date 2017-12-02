import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

export default class Checkout extends Component {
    state = {
        ingredients: {}
    };
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }
        this.setState({ingredients});
    }

    checkoutCanceled = () => {
        this.props.history.goBack();
    };

    checkoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        console.log(this.state.ingredients);
        return (
            <div className="">
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutContinue={this.checkoutContinue}
                                 checkoutCanceled={this.checkoutCanceled} />
            </div>
        );
    }
}