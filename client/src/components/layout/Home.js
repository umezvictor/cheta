import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

 //redirect to dashboard if logged, prevents showing of signing, login links and homepage link once logged in
 

class Home extends Component{

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    render(){
        return(
            <div>
                 <h1>Welcome to Cheta, the best reminder app in the world</h1>
            </div>
        )
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
} 

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);