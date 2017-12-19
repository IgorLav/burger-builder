import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
    <nav>
        <ul className={[classes.NavigationItems, props.className].join(' ')}>
            <NavItem link="/" exact>Home</NavItem>
            <NavItem link="/burger-builder">Burger Builder</NavItem>

            {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null }

            {props.isAuthenticated ? (
                <NavItem link="/logout" exact>Logout</NavItem>
            ) : (
                <NavItem link="/auth" exact>Auth</NavItem>
            )}
        </ul>
    </nav>
);

export default navItems;