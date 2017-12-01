import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
    <nav>
        <ul className={[classes.NavigationItems, props.className].join(' ')}>
            <NavItem link="/burger-builder">Burger Builder</NavItem>
            <NavItem link="/checkout">Checkout</NavItem>
        </ul>
    </nav>
);

export default navItems;