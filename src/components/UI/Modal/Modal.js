import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children
    }

    render() {
        const {children, show, close} = this.props;
        const styles = show ? {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1
        } : {
            transform: 'translate(-50%, -50%) scale(.6)',
        };

        return (
            <React.Fragment>
                <Backdrop show={show} close={close}/>
                <div className={classes.Modal} style={styles}>
                    {children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal;