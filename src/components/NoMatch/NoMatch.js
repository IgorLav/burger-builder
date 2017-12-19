import React from 'react';
import * as classes from './NoMatch.css';

const NoMatch = (props) => (
    <div className={classes.NoMatchWrap}>
        <h1 className={classes.Heading}><span className={classes.BigText}>404</span> <br/> The page wasn't found.</h1>
    </div>
);

export default NoMatch;