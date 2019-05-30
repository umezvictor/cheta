import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddItems from '../items/AddItem';
import { getCurrentUser } from '../../actions/authActions';

 class Dashboard extends Component {

    componentDidMount(){
        //get current user
        this.props.getCurrentUser();
    }
    render() {
        //auth reducer contains isAuthenticated and user object
        const { user } = this.props.auth;

        return (
            <div>
                <h1>Welcome {user.firstname}</h1>
                <AddItems />
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentUser: PropTypes.func.isRequired
}

//map the redux state to component props
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentUser})(Dashboard);