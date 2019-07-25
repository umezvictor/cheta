import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Features from './Features';
import '../../assets/css/main.css';
import people from '../../assets/images/people.jpg';

 //redirect to dashboard if logged, prevents showing of signing, login links and homepage link once logged in
 

class Home extends Component{

    componentDidMount() {
        //redirect to dashboard if user is authenticated
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    render(){
        return(
          <React.Fragment>
                <div className="showcase">
                    <div className="intro-text-left">
                        <h1>Never worry about forgetting a task again</h1>
                        <p>Life can be overwhelming, but it doesn't have to be. Cheta lets you 
                        keep track of everything in one place, so you can get it all done and focus on other things you love
                        </p>
                        <a className="btn" href="/signup">Get started - it's free</a>
                    </div>
                    <div className="intro-image-right">
                   
                        <img src={people} alt="illustration"/>
                   
                    </div>
                </div> 
                <Features />
          </React.Fragment>               
               
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

