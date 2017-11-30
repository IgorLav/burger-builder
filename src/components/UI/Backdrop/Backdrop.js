import React from 'react';
import classes from './Backdrop.css';

const backdrop = ({close, show}) => (
    show ? <div className={classes.Backdrop} onClick={close}> </div> : null
);

export default backdrop;