import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/itemActions';



 class AddItem extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            details: '',
            remindMeBy: '',
            errors: {}
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    

    //enable input fields
    onInputChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    //triger addItem action 
    onFormSubmit(e){
        e.preventDefault();
        //create items objects
        const item = {
            
            
            title: this.state.title,
            details: this.state.details,
            remindMeBy: this.state.remindMeBy    
        };

        this.props.addItem(item);
    }
    
    
    render() {
        const { user } = this.props.auth;
        const { item } = this.props.item;
        return (
            <div>
                <h1>Add Item</h1>
               
               <form onSubmit={this.onFormSubmit}>
              
                   <input name="title" type="text" placeholder="title" value={this.state.title} onChange={this.onInputChange}/> <br /><br />
                   <input name="details" type="text" placeholder="details" value={this.state.email} onChange={this.onInputChange}/> <br /><br />
                   <input name="remindMeBy" type="date" value={this.state.phone} onChange={this.onInputChange}/> <br /><br />
                   <input type="submit" value="Add Item"/>
               </form>
            </div>
        )
    }
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    item: state.item
});

export default connect(mapStateToProps, { addItem })(AddItem);