import React from 'react';
import classes from './NavItem.css';
import {NavLink} from 'react-router-dom'


const navItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}>{props.children}</NavLink>
    </li>
);

export default navItem ;