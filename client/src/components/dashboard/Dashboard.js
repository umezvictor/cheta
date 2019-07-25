import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


 class Dashboard extends Component {

    
    render() {
       
        //auth reducer contains isAuthenticated and user object
        const { user } = this.props.auth;

        return (
            <div>
                <h1>Welcome {user.firstname}</h1>
               
                <Link className="nav-link" to="/dashboard/add_item">Create Reminder</Link>
                <Link className="nav-link" to="/dashboard/get_items">View Items</Link>
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
   
}

//map the redux state to component props
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);