import React, {Component} from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, withRouter, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import Home from './components/Home/Home';
import NoMatch from './components/NoMatch/NoMatch';
import {connect} from 'react-redux';
import * as actions from './store/actions';

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        const routes = [
            <Route path="/" component={Home} exact key="Home"/>,
            <Route path="/burger-builder" component={BurgerBuilder} exact key="burger-builder"/>,
            <Route path="/auth" component={Auth} exact key="auth"/>,
        ];
        if(this.props.isAuthenticated) {
            routes.push(
                <Route path="/checkout" component={Checkout} key="checkout"/>,
                <Route path="/orders" component={Orders} key="orders"/>,
                <Route path="/logout" component={Logout} key="logout"/>
            )
        }
        return (
            <div>
                <Layout>
                    <Switch>
                        {routes}
                        <Route component={NoMatch} key="NoMatch" />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onTryAutoSignup: () => dispatch(actions.authCheckState())
});

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
