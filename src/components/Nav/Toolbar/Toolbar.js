import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
    return (
      <header className={classes.Toolbar}>
          <DrawerToggle clicked={props.navHandler} />
          <Logo height="80%"/>

          <div className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuthenticated} />
          </div>
      </header>
    );
};

export default toolbar;