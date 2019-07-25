import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'; 


//import css
import '../../assets/css/main.css';

 class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();//logs out user  
    }

    render() {
// {isAuthenticated ? authLinks : guestLinks}
        //conditional rendering of navigation links, eg signup, login
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = ( 
            
                <ul>
                
                <li>
                    <a href=" " onClick={this.onLogoutClick.bind(this)}>
                        Hi  {user.firstname}  Logout
                    </a>
                </li>
            </ul> 
            
                   
        );

        const guestLinks = ( 
            
                <ul>
                    <li>
                         <a className="current-link" href="/login">Login</a>
                    </li>
                    <li>
                         <a href="/signup">Signup</a>
                    </li>
            </ul>
            
                    
        );

        return (
            <header>
                <nav className="mynav">
                    <div className="mycontainer">
                        <h1 className="logo"><a href="/">Cheta</a></h1>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>     
                </nav>   
            </header>
        )
    } 
}


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Navbar);
