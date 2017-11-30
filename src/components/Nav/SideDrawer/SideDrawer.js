import React from 'react';
import classes from './SideDrawer.css';
import NavItems from '../NavItems/NavItems';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.showNav ? classes.Open : null];
    return (
        <Aux>
            <Backdrop show={props.showNav} close={props.navHandler} />

            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <NavItems />
            </div>
        </Aux>
    )
};

export default sideDrawer;