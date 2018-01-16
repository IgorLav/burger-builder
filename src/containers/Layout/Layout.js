import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Nav/Toolbar/Toolbar'
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
      showSideDrawer: false
    };

    navHandler = () => {
        this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
    };

    render() {
        const state = this.state;
        return (
            <React.Fragment>
                <Toolbar navHandler={this.navHandler} isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer showNav={state.showSideDrawer}
                            navHandler={this.navHandler}
                            isAuthenticated={this.props.isAuthenticated}/>

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});

export default connect(mapStateToProps)(Layout);
