import React from 'react';
import classes from './Home.css';
import burgerImg from '../../assets/burger.png';

export default class Home extends React.Component {
    render() {
        return (
            <div className={classes.Page}>
                <header className={classes.PageHeader}>
                    <h1>Burger builder is a test web app.</h1>
                    <p>The main goal of the app is to polish and refresh knowledge of React and Redux libraries</p>

                    <img className={classes.burgerImg} src={burgerImg} alt=""/>
                </header>
            </div>
        );
    }
}