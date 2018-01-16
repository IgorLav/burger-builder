import React from 'react';
import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.showNav ? classes.Open : null];

    return (
        <React.Fragment>
            <Backdrop show={props.showNav} close={props.navHandler} />

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <NavItems isAuthenticated={props.isAuthenticated} closeNav={props.navHandler}/>
            </div>
        </React.Fragment>
    )
};

export default sideDrawer;