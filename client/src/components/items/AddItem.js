import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/itemActions';
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/material_green.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import moment from 'moment';




 class AddItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            details: '',
            remindMeBy: new Date(),
            errors: {}
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
      
    }

    

    // //enable input fields
    onInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    };

    handleChange(date){
    // console.log(date); 
        this.setState({remindMeBy: date});
    };

    //triger addItem action 
    onFormSubmit(e){
       e.preventDefault();
        
        //create items objects
        const item = {
            title: this.state.title,
            details: this.state.details,
            remindMeBy: this.state.remindMeBy    
        };

        this.props.addItem(item, this.props.auth.user.id);
        
    }
    
    
    render() {
        
       
        
        return (
            <div>
                <h1>Add an item</h1>
               
               <form>
              
               <input name="title" type="text" placeholder="title" value={this.state.title} onChange={this.onInputChange}/> <br /><br />
                   <input name="details" type="text" placeholder="details" value={this.state.email} onChange={this.onInputChange}/> <br /><br />
                   <DatePicker 
                    selected={ this.state.remindMeBy}
                   onChange={this.handleChange } 
                    name="remindMeBy"
                    showTimeSelect
                    timeFormat='HH:mm'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    
                   /><br /><br />
                   <button type="submit" onClick={this.onFormSubmit}>Add Item</button>
               </form>
            </div>
        )
    }
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.items
});

export default connect(mapStateToProps, { addItem })(AddItem);

/*

 return (
            <div>
                <h1>Add an item</h1>
               
               <form>
              
                   <input name="title" type="text" placeholder="title" value={this.state.title} onChange={this.onInputChange}/> <br /><br />
                   <input name="details" type="text" placeholder="details" value={this.state.email} onChange={this.onInputChange}/> <br /><br />
                   <Flatpickr name="remindMeBy" data-enable-time value={remindMeBy} onChange={remindMeBy => { this.setState({remindMeBy}) }} /><br /><br />
                   <button type="submit" onClick={this.onFormSubmit}>Add Item</button>
               </form>
            </div>
        )
*/