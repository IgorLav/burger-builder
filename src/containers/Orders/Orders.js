import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axiosIns from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        const props = this.props;

        return (
            <div>
                { props.loading ? <Spinner/> : props.orders.map(item => (
                    <Order key={item.id}
                           ingredients={item.ingredients}
                           price={+item.price}/>)
                )}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosIns));