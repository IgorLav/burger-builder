import React, {Component} from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show
    }
    
    render() {
        const {children, show, close} = this.props;

        return (
            <Aux>
                <Backdrop show={show} close={close}/>
                <div className={classes.Modal}
                     style={{transform: show ? 'translateY(0)' : 'translateY(-100vh)'}}
                >
                    {children}
                </div>
            </Aux>
        )
    }
}

export default Modal;