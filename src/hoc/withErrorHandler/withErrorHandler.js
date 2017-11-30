import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';
import axiosInst from '../../axios-orders';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axiosInst.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axiosInst.interceptors.response.use(res=> res, err => {
                this.setState({ error: err });
            });
        }

        componentWillUnmount () {
            axiosInst.interceptors.request.eject(this.reqInterceptor);
            axiosInst.interceptors.response.eject(this.resInterceptor);
        }

        closeModalHandler = () => {
            this.setState({ error: null });
        };

        render() {
            const error = this.state.error;
            return (
                <Aux>
                    <WrappedComponent {...this.props} />
                    <Modal show={error} close={this.closeModalHandler}>
                        <p>
                            {error ? error.message : null}
                        </p>
                    </Modal>
                </Aux>
            );
        }
    }
};

export  default withErrorHandler;