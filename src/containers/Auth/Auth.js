import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                label: 'Email',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: 'Password',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSingUp: true
    };

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== "/burger-builder") {
            console.log(this.props.authRedirectPath);
            this.props.onSetAutRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputHandler = (e, id) => {
        const updateFormInfo = {
            ...this.state.controls
        };

        const value = e.target.value;

        updateFormInfo[id] = {
            ...updateFormInfo[id],
            value: value,
            valid: this.checkValidity(value, updateFormInfo[id].validation),
            touched: true
        };

        let formIsValid = true;

        for (let control in updateFormInfo) {
            if (updateFormInfo[control].validation) {
                formIsValid = updateFormInfo[control].valid && formIsValid
            }
        }

        this.setState({
            controls: updateFormInfo,
            formIsValid
        })
    };

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp);
    };

    switchAuthMode = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            isSingUp: !prevState.isSingUp
        }))
    };

    render() {
        const state = this.state;
        const formElementArray = Object.keys(state.controls).map(key => ({
            ...state.controls[key],
            id: key
        }));

        let errorMsg = this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}</p> : null;

        if (this.props.isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className={classes.Auth}>
                <h2>{this.state.isSingUp ? 'Sign Up' : 'Sign In'} Form</h2>
                {
                    this.props.loading ? <Spinner/> : (
                        <form action="" onSubmit={this.submitHandler}>
                            {errorMsg}
                            {formElementArray.map(
                                item => <Input key={item.id}
                                               inputHandler={(e) => this.inputHandler(e, item.id)}
                                               elementType={item.elementType}
                                               elementConfig={item.elementConfig}
                                               value={item.value}
                                               invalid={!item.valid}
                                               shouldValidate={item.validation}
                                               touched={item.touched}
                                               label={item.label}/>
                            )}

                            <Button btnType="Success">Submit</Button>
                            <Button btnType="Danger" clicked={this.switchAuthMode}>
                                Switch to {this.state.isSingUp ? 'Sign In' : 'Sihgn Up'}
                            </Button>
                        </form>
                    )
                }
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAutRedirectPath: () => dispatch(actions.setAuthRedirectPath('/burger-builder'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);