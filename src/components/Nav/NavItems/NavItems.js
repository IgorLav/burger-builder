import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
    <nav>
        <ul className={[classes.NavigationItems, props.className].join(' ')}>
            <NavItem closeNav={props.closeNav} link="/" exact>Home</NavItem>
            <NavItem closeNav={props.closeNav} link="/burger-builder">Burger Builder</NavItem>

            {props.isAuthenticated ? <NavItem link="/orders" closeNav={props.closeNav}>Orders</NavItem> : null }

            {props.isAuthenticated ? (
                <NavItem closeNav={props.closeNav} link="/logout" exact>Logout</NavItem>
            ) : (
                <NavItem closeNav={props.closeNav} link="/auth" exact>Auth</NavItem>
            )}
        </ul>
    </nav>
);

export default navItems;