import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addItem } from '../../actions/itemActions';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../assets/css/admin.css';

 class AddItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            details: ' ',
            remindMeBy: new Date(),
            errors: {}
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);

        //layout
        this.openSideMenu = this.openSideMenu.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
      
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.errors){
    //         this.setState({errors: nextProps.errors});
    //     }
    // }
    openSideMenu(){
        
        //side menu
        const sideMenu = document.getElementById('side-menu'); 
        sideMenu.style.width = '250px';
        sideMenu.style.backgroundColor = '#04A777';
        //close-btn
       const closeBtn = document.getElementById('close-btn');
       closeBtn.style.display = 'block';
       closeBtn.style.position = 'static';
       closeBtn.style.top = '0';
       closeBtn.style.rigth = '22px';
       closeBtn.style.fontSize = '20px';
       closeBtn.style.marginLeft = '120px';
       closeBtn.style.color = '#fff';
       closeBtn.style.opacity = '0.9';

        //home link
        const homeLink = document.getElementById('home-link');
        homeLink.style.display = 'block';
        homeLink.style.padding = ' 10px 10px 10px 30px';
        homeLink.style.textDecoration = 'none';
        homeLink.style.fontSize = '14px';
        homeLink.style.color = '#fff';
        homeLink.style.transition = '0.3s';

        //create-item-link
        const createItemLink = document.getElementById('create-item-link');
        createItemLink.style.display = 'block';
        createItemLink.style.padding = ' 10px 10px 10px 30px';
        createItemLink.style.textDecoration = 'none';
        createItemLink.style.fontSize = '14px';
        createItemLink.style.color = '#fff';
        createItemLink.style.transition = '0.3s';

        //view item link
        const viewItemLink =  document.getElementById('view-item-link');
        viewItemLink.style.display = 'block';
        viewItemLink.style.padding = ' 10px 10px 10px 30px';
        viewItemLink.style.textDecoration = 'none';
        viewItemLink.style.fontSize = '14px';
        viewItemLink.style.color = '#fff';
        viewItemLink.style.transition = '0.3s';
      }

      closeSideMenu(){
        const sideMenu =  document.getElementById('side-menu');
        sideMenu.style.width = '0';
        sideMenu.style.transition = '0.5s';
        document.getElementById('main').style.marginLeft = '0';
      }
    

    // //enable input fields
    onInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    };

    handleChange(date){
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
        const { isAuthenticated} = this.props.auth;

        //redirect to login page if user is not logged in  -- restricting page access
        if(isAuthenticated === false){
            window.location.href = "/login";
        }

      //  const { errors } = this.state;

        return (
            <React.Fragment>
            <nav className="navbar">
            <span className="open-slide">
            <button className="open-menu-btn" onClick={this.openSideMenu}>
                            <svg width="30" height="30">
                                <path d="M0,5 30,5" stroke="#D78521" strokeWidth="3"/>
                                <path d="M0,14 30,14" stroke="#D78521" strokeWidth="3" />
                                <path d="M0,23 30,23" stroke="#D78521" strokeWidth="3" />
                            </svg>
                        </button>
                    </span>
            </nav>

            <div id="display" className="display-area">
                <div id="side-menu" className="side-nav ">
                
                    <button href="#" id="close-btn" className="btn-close" onClick={this.closeSideMenu}>&times;</button>
                    <a href="/dashboard" id="home-link"><i className="fa fa-home" aria-hidden="true"></i> Dashboard</a>
                    <a href="/dashboard/add_item" id="create-item-link"><i className="fa fa-plus" aria-hidden="true"></i> Add Item</a>
                    <a href="/dashboard/get_items" id="view-item-link"><i className="fa fa-eye" aria-hidden="true"></i> View Items</a>
                   
                </div>
                <div id="main" className="main-content">
                   
                <div className="add-item-form">
                <h1 className="item-header">Add an Item to your reminder</h1>
               
                        <form>
                            <input name="title" className="text-input" type="text" placeholder="Enter title" value={this.state.title} onChange={this.onInputChange}/> 
                           
                            <input name="details" className="text-input" type="text" placeholder="Details (optional) " value={this.state.email} onChange={this.onInputChange}/> 
                              
                                    <span className="date-span">Select due date </span><DatePicker
                                    className="date-picker" 
                                    selected={ this.state.remindMeBy}
                                    onChange={this.handleChange } 
                                    name="remindMeBy"
                                    showTimeSelect
                                    timeFormat='HH:mm'
                                    dateFormat='MMMM d, yyyy h:mm aa'    
                                /> 
                            <input className="item-btn" type="submit" value="Add item" onClick={this.onFormSubmit}/>
                        </form>
                    </div>
                </div>
            </div>
            </React.Fragment>
           
        )
    }
}

AddItem.propTypes = {
    addItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.items,
    errors: state.errors
});

export default connect(mapStateToProps, { addItem })(AddItem);
