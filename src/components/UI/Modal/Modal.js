import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children
    }

    render() {
        const {children, show, close} = this.props;

        return (
            <React.Fragment>
                <Backdrop show={show} close={close}/>
                <div className={classes.Modal}
                     style={{transform: show ? 'translateY(0)' : 'translateY(-100vh)'}}
                >
                    {children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;