import React, { Component } from 'react';
import PropTypes from "prop-types";

class EditItemModal extends Component {

 

    render() {
        //this handles conditional rendering of the modal
        if(!this.props.show){
            return null;
        }

        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius : 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30
        }
        return (
            <div style={{modalStyle}}>
               {this.props.children}
                <button className="btn btn-primary" onClick={this.props.onClose}>Close</button>
            </div>
         
        )
    }
}

EditItemModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};
export default EditItemModal;
