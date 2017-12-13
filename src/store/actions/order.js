import * as actionTypes from './actionTypes';
import axiosInst from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFailed = (err) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: err
    }
};


export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axiosInst.post('orders.json', orderData)
            .then(res => {
                console.log('succeess');
                dispatch(purchaseBurgerSuccess(res.data.name, orderData));
            })
            .catch(err => {
                console.log(err)
                dispatch(purchaseBurgerFailed(err));
            });
    };
};

export const fetchOrdersSucces = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
});

export const fetchOrdersFail = (err) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        axiosInst.get('/orders.json')
            .then(res => {
                const orders = res.data || {};

                const data = Object.keys(orders)
                    .map(key => ({
                        ...res.data[key],
                        id: key
                    }));
                dispatch(fetchOrdersSucces(data))
            }).catch(err => dispatch(fetchOrdersFail(err)));
    }
};
