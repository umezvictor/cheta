import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';//for redirecting from redux action
import  PropTypes  from "prop-types";//a react thing


//redux implememntation
//to use redux in a react component, use connect
import { connect } from 'react-redux';
//reference the action or actioncreator file
import { registerUser } from '../../actions/authActions';//action triggered when a user registers
//any action brought in can be referenced through props

//css
import '../../assets/css/main.css';

class Signup extends Component {

   
    constructor() {
        super();
        this.state = {
            //init form fields and errors field
            firstname: '',
            email: '',
            phone: '',
            password: '',
            errors: {}//will be used when redux is implememnted
        };

        this.onInputChange = this.onInputChange.bind(this);//bind this
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //redirect to dashboard if logged, prevents showing of signing, login links and homepage link once logged in
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    /*
    when a component receives prop from eg redux we use this lifecycle method
    the goaal here is to access errors via this.state as already used from the beginning
    it can still be received via this.props.errors, but this method is what I choose

    */

    componentWillReceiveProps(nextProps){
        //nextProp refers to the props it received
        //test if it received the errors prop from redux 
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    //enable typing into form fields, else you can't type into it
    onInputChange(e){
        this.setState({[e.target.name]: e.target.value});//get user input
    }

    //submit form data, triggers the action creator 'registerUser'
    onFormSubmit(e){
        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        };

        /*
        registerUser is the action. withRouter allows me to 
        redirect using this,props.history within the registerUser action file in redux
        */
        this.props.registerUser(newUser, this.props.history);    
    }


    render() {
        const { errors } = this.state;
        
        return (
            <div className="signup-form">
                <form onSubmit={this.onFormSubmit}>
                <h1>Create an account</h1>
                    <input className="textinput" name="firstname" type="text" placeholder="firstname" value={this.state.firstname} onChange={this.onInputChange}/> 
                    <span className="errors">{errors.firstname}</span> 
                    <input className="textinput" name="email" type="email" placeholder="email" value={this.state.email} onChange={this.onInputChange}/> 
                    <span className="errors">{errors.email}</span>
                    <input className="textinput" name="phone" type="text" placeholder="phone number" value={this.state.phone} onChange={this.onInputChange}/> 
                    <span className="errors">{errors.phone}</span>
                    <input className="textinput" name="password" type="password" placeholder="password" value={this.state.password} onChange={this.onInputChange}/> 
                    <span className="errors">{errors.password}</span>
                    <input className="signup-btn" type="submit" value="Signup"/>
                    <span>Already have an account?  </span><a href="/login">login</a>
                </form>
            </div>
        )
    }
}


//set proptypes, include all properties asociated with this file. React standard practice but not mandatory
Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,//registerUser is a property and a function, hence func
    auth: PropTypes.object.isRequired, //auth is an object
    errors: PropTypes.object.isRequired
}

//to get the state (auth state in this case) use the function below
const mapStateToProps = (state) => ({
    auth: state.auth,
    //first auth is just a property, could be anything; second auth here 
    //comes from the name used in the root reducer; accessed via this.props.auth
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));

//this.props.history.push('/dashboard)  eg redirecting from a component