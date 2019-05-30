import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'; 

 class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();//logs out user  
    }

    render() {

        //conditional rendering of navigation links, eg signup, login
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = ( 
            <ul>
                
                <li className="nav-item">
               <a href=" " onClick={this.onLogoutClick.bind(this)} className="nav-link">
                   Hi  {user.firstname}  Logout
               </a>
                </li>
            </ul>        
        );

        const guestLinks = ( 
            <ul>
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
                </li>
            </ul>        
        );

        return (
            <div >
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Cheta</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link><span className="sr-only">(current)</span>
                            </li>
                       
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
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
