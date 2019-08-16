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
                    <Link to=" " onClick={this.onLogoutClick.bind(this)}>
                        Hi  {user.firstname},  <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
                    </Link>
                </li>
            </ul> 
            
                   
        );

        const guestLinks = ( 
            
                <ul>
                    <li>
                         <Link className="current-link" to="/login">Login</Link>
                    </li>
                    <li>
                         <Link to="/signup">Signup</Link>
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
