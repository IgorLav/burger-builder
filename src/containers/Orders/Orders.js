import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axiosIns from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        const props = this.props;

        return (
            <div>
                { props.loading ? <Spinner/> : props.orders.map(item => ( <Order key={item.id}
                                                                                 ingredients={item.ingredients}
                                                                                 price={+item.price}/>))}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading
});


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosIns));