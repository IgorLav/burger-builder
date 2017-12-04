import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axiosIns from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state = {
        orders: [],
        loading: []
    };

    componentDidMount() {
        axiosIns.get('/orders.json')
            .then(res => {
                const orders = res.data || {};
                const data = Object.keys(orders)
                    .map(key => ({
                        ...res.data[key],
                        id: key
                    }));
                this.setState({
                    orders: data
                })
            }).catch(err => console.log(err));
    }

    render() {
        const state = this.state;
        return (
            <div>
                {state.orders.map(item => (
                   <Order key={item.id}
                          ingredients={item.ingredients}
                          price={+item.price}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders);