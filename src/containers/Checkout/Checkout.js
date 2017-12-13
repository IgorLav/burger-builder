import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {
    checkoutCanceled = () => {
        this.props.history.goBack();
    };

    checkoutContinue = () => {
        this.props.history.push('/checkout/contact-data');
    };
    render() {
       if(this.props.purchased) {
           return <Redirect to="/burger-builder"/>
       }

        const summary = (this.props.ingredients ?
            <CheckoutSummary ingredients={this.props.ingredients}
                             checkoutContinue={this.checkoutContinue}
                             checkoutCanceled={this.checkoutCanceled}/> :
            <Redirect to="/burger-builder"/>);

        return (
            <div className="">
                {summary}
                <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);