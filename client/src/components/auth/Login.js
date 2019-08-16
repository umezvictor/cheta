import React, { Component } from 'react'
import  PropTypes  from "prop-types";//a react thing
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import '../../assets/css/main.css';
//
class Login extends Component {

    constructor() {
        super();
        this.state = {
            //init form fields and errors field 
            email: '',
            password: '',
            errors: {}//will be used when redux is implememnted
        };

        this.onInputChange = this.onInputChange.bind(this);//bind this
        this.onLogin = this.onLogin.bind(this);
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            //redirect to dashboard if user is authernticated
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps){
       //check if there is an authenticated prop from redux app level state 
       if(nextProps.auth.isAuthenticated){
           //redirect to dashboard
           this.props.history.push('/dashboard');
       }
       // if errors props exist in the app level state, change component errors state to the errors prop
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    //enable typing into form
    onInputChange(e){
        this.setState({[e.target.name]: e.target.value});//get user input
    }

    //submit form data via api
    onLogin(e){
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

       this.props.loginUser(userData);
    }


    render() {

       const { errors } = this.state;//from index reducer
        return (
            <div className="login-form">
                
                <form onSubmit={this.onLogin}>
                
                <h1>Login</h1>
                   
                        <input className="textinput" name="email" type="email" placeholder="email" value={this.state.email} onChange={this.onInputChange}/> 
                        <span className="errors">{errors.email}</span>
                        <input  className="textinput" name="password" type="password" placeholder="password" value={this.state.password} onChange={this.onInputChange}/>
                        <span className="errors">{errors.password}</span>
                    <input className="login-btn" type="submit" value="Login"/>
                    <span>Don't have an account?  </span><a href="/signup">Create one</a>
                </form>
            </div>
        )
    }
}

//set proptypes, include all properties asociated with this file. React standard practice but not mandatory
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,//registerUser is a property and a function, hence func
    auth: PropTypes.object.isRequired, //auth is an object
    errors: PropTypes.object.isRequired
}

//to get the state (auth state in this case) use the function below
const mapStateToProps = (state) => ({
    auth: state.auth,//first auth is just a property, could be anything; second auth here comes from the name used in the root reducer; accessed via this.props.auth
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);