import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Redirect} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/burger-builder" component={BurgerBuilder} exact/>
                    <Route path="/checkout" component={Checkout} exact/>
                </Layout>
            </div>
        );
    }
}

export default App;
