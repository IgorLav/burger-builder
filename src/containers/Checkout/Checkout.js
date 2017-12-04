import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';

export default class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                this.setState({totalPrice: param[1]})
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients});
    }

    checkoutCanceled = () => {
        this.props.history.goBack();
    };

    checkoutContinue = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {
        return (
            <div className="">
                <CheckoutSummary ingredients={this.state.ingredients}
                                 checkoutContinue={this.checkoutContinue}
                                 checkoutCanceled={this.checkoutCanceled}/>
                <Route path={this.props.match.path + '/contact-data'}
                       render={() => <ContactData ingredients={this.state.ingredients}
                                                  {...this.props}
                                                  price={this.state.totalPrice}/>}/>
            </div>
        );
    }
}