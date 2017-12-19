import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInst from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import {checkValidity} from '../../shared/validation';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                label: 'Name',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                label: 'Email',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                label: 'Street',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zipCode'
                },
                value: '',
                label: 'Zip Code',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            label: 'Fastest'
                        },
                        {
                            value: 'normal',
                            label: 'Normal'
                        }
                    ]
                },
                label: 'Delivery',
                value: 'fastest'
            }
        },
        formIsValid: false
    };

    orderHandler = (e) => {
        e.preventDefault();

        const orderForm = this.state.orderForm;
        const formData = Object.keys(orderForm).map(key => ({[key]: this.state.orderForm[key].value}));
        this.props.onOrderBurger({
            ingredients: this.props.ingredients,
            customer: formData,
            price: this.props.totalPrice,
            userId: this.props.userId
        }, this.props.token);
    };

    inputHandler = (e, id) => {
        const updateFormInfo = {
            ...this.state.orderForm
        };

        const value = e.target.value;

        updateFormInfo[id] = {
            ...updateFormInfo[id],
            value,
            valid: checkValidity(value, updateFormInfo[id].validation),
            touched: true
        };

        let formIsValid = true;

        for (let control in updateFormInfo) {
            if (updateFormInfo[control].validation) {
                formIsValid = updateFormInfo[control].valid && formIsValid
            }
        }

        this.setState({
            orderForm: updateFormInfo,
            formIsValid
        })
    };

    render() {
        const state = this.state;
        const formElementArray = Object.keys(state.orderForm).map(key => ({
            ...state.orderForm[key],
            id: key
        }));

        let form = !this.props.loading ? (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(
                    item =>  <Input key={item.id}
                                   inputHandler={(e) => this.inputHandler(e, item.id)}
                                   elementType={item.elementType}
                                   elementConfig={item.elementConfig}
                                   value={item.value}
                                   invalid={!item.valid}
                                   shouldValidate={item.validation}
                                   touched={item.touched}
                                   label={item.label}/>
                )}
                <Button btnType="Success" disabled={!state.formIsValid}>Order</Button>
            </form>
        ) : <Spinner/>;

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData), axiosInst);