import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.css';
import Toolbar from '../../components/Nav/Toolbar/Toolbar'
import SideDrawer from '../../components/Nav/SideDrawer/SideDrawer';


export default class Layout extends Component {
    state = {
      showSideDrawer: false
    };

    navHandler = () => {
        this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
    };

    render() {
        const state = this.state;
        return (
            <Aux>
                <Toolbar navHandler={this.navHandler}/>
                <SideDrawer showNav={state.showSideDrawer} navHandler={this.navHandler}/>

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};
