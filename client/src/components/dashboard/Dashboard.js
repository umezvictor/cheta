import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../assets/css/admin.css';

 class Dashboard extends Component {
    constructor(){
        super();
        this.openSideMenu = this.openSideMenu.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
    }
    

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
    
    render() {
       
        //auth reducer contains isAuthenticated and user object
        const { isAuthenticated, user } = this.props.auth;

        //redirect to login page if user is not logged in  -- restricting page access
        if(isAuthenticated === false){
            window.location.href = "/login";
        }

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
                
                    <button  id="close-btn" className="btn-close" onClick={this.closeSideMenu}>&times;</button>
                    <a href="/dashboard" id="home-link"><i className="fa fa-home" aria-hidden="true"></i> Dashboard</a>
                    <a href="/dashboard/add_item" id="create-item-link"><i className="fa fa-plus" aria-hidden="true"></i> Add Item</a>
                    <a href="/dashboard/get_items" id="view-item-link"><i className="fa fa-eye" aria-hidden="true"></i> View Items</a>
                    
                </div>
               
               
            
                <div id="main" className="main-content">
                    <h1 className="welcome-text">Welcome {user.firstname}</h1>
                    <a className="welcome-link" href="/dashboard/add_item">Create a new reminder</a>
                   
                </div>
            </div>
           
            </React.Fragment>
           
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
   
}

//map the redux state to component props
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps)(Dashboard);