import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';//for redirecting from redux action
import  PropTypes  from "prop-types";//a react thing
//import classnames from 'classnames';

//redux implememntation
//to use redux in a react component, use connect
import { connect } from 'react-redux';
//reference the action or actioncreator file
import { registerUser } from '../../actions/authActions';//action triggered when a user registers
//any action brought in can be referenced through props

class Signup extends Component {

    /*
    this component has a component level state, not app level state,
     because the state only applies to the 
    form components.

    app level state will be handled by redux
    */

    /*
    initialise state within constructor
    when you are getting props from the parent component, then use
    constructor(props){
        super(props)
    }
    */
    constructor() {
        super();
        this.state = {
            //init form fields and errors field
            firstname: '',
            gender: '',
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

    /*
       classname package helps us display classnames conditionally,
       i used it to display bootstrap error validator classes (is-invalid, invalid-feedback)
        messages conditionally,
    

            http://localhost:5000/users/resgister is not used in the axios post request 
            because http://localhost:5000 has been defined
            as "proxy" in the client package.json file. the system understands what we mean
        */

    //submit form data, triggers the action creator 'registerUser'
    onFormSubmit(e){
        e.preventDefault();

        const newUser = {
            firstname: this.state.firstname,
            gender: this.state.gender,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password
        };

        /*
        registerUser is the action. withRouter allows me to 
        redirect using this,props.history within the registerUser action file in redux
        */
        this.props.registerUser(newUser, this.props.history);


        /*
        onsubmit, what happens?
        1. call registerUser
        2. dispatches to the reducer
        3. fills the user object 
        note the auth state was mapped to a property in this component
        */
        
        /*
        axios equest has been moved to the redux authAction.js, was here before

        axios.post('/users/register', newUser)
            .then(res => console.log(res.data))
           .catch(err => this.setState({errors: err.response.data}));
            //.catch(err => console.log(err.response.data));
            //save any error message into the errors object and use it to display error message on the browser
       */ 
    }


    render() {
        //const { errors } = this.state;
        
        return (
            <div>
                <h1>Signup here</h1>
               
                <form onSubmit={this.onFormSubmit}>
                <input name="firstname" type="text" placeholder="firstname" value={this.state.firstname} onChange={this.onInputChange}/> <br /><br />
                    <input name="gender" type="text" placeholder="gender" value={this.state.gender} onChange={this.onInputChange}/> <br /><br />
                    <input name="email" type="email" placeholder="email" value={this.state.email} onChange={this.onInputChange}/> <br /><br />
                    <input name="phone" type="text" placeholder="phone number" value={this.state.phone} onChange={this.onInputChange}/> <br /><br />
                    <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.onInputChange}/> <br /><br />
                    <input type="submit" value="Signup"/>
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