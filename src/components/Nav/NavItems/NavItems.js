import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = (props) => (
    <nav>
        <ul className={[classes.NavigationItems, props.className].join(' ')}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>
        </ul>
    </nav>
);

export default navItems;