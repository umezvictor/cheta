import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Features from './Features';
import Testimonials from './Testimonials';
import '../../assets/css/main.css';
import remember from '../../assets/images/remember.png';
import todoist from '../../assets/images/todoist.png';

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
                        <h1>Everyone loves having an assistant</h1>
                        <p>Life can be overwhelming, but it doesn't have to be. Cheta sends you real time reminders
                            via SMS, Email and Push Notifications. That way, you can take your head of remembering tasks.
                        </p>
                        <a className="btn" href="/signup">Get started - it's free</a>
                    </div>
                    <div className="intro-image-right">
                   
                        <img src={todoist} alt="illustration"/>
                   
                    </div>
                </div> 
                <div className="below-showcase">
                    
                     <div className="pitch-image-div">
                            <img src={remember} alt="illustration"/>
                    </div>

                    <div className="pitch-area">
                        <h1>Never worry about forgetting things again</h1>
                        <p>Let Cheta remember it all for you. You can get tasks out of your head and onto
                             your reminder anytime, anywhere, on any 
                             device.</p>
                             <a href="/">See How it Works <i className="fa fa-angle-double-right" aria-hidden="true"></i></a>
                    </div>
                </div>

                <Features />
                <Testimonials />
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


