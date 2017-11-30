import React from 'react';
import classes from './DrawerToggle.css';

const rawerToggle = (props) => (
    <button className={classes.DrawerToggle} onClick={props.clicked}>
        <div> </div>
        <div> </div>
        <div> </div>
    </button>
);

export default rawerToggle;