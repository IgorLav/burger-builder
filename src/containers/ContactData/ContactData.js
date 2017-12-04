import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axiosInst from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


import Input from '../../components/UI/Input/Input';
export default class ContactData extends React.Component {
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
                }
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
                }
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
                }
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
                    required: true
                }
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
                value: '',
                label: 'Delivery'
            }
        },
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const orderForm = this.state.orderForm;
        const formData =  Object.keys(orderForm).map(key => ({[key]:this.state.orderForm[key].value}));
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData
        };

        axiosInst.post('orders.json', order)
            .then(res => {
                this.setState({
                    loading: false,
                });
                this.props.history.push('/burger-builder')
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                console.log(err)
            });
    };

    inputHandler = (e, id) => {
        const updateFormInfo = {
            ...this.state.orderForm
        };

        updateFormInfo[id] = {
            ...updateFormInfo[id],
            value: e.target.value
        };

        this.setState({
            orderForm: updateFormInfo
        })
    };

    render() {
        const state = this.state;
        const formElementArray = Object.keys(state.orderForm).map(key => ({
            ...state.orderForm[key],
            id: key
        }));

        let form = !this.state.loading ? (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(item => <Input key={item.id}
                                                     inputHandler={(e) => this.inputHandler(e, item.id)}
                                                     elementType={item.elementType}
                                                     elementConfig={item.elementConfig}
                                                     value={item.value}
                                                     label={item.label}/>
                )}
                <Button btnType="Success">Order</Button>
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