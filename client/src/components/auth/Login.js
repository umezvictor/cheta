import React, { Component } from 'react'
import  PropTypes  from "prop-types";//a react thing
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';



class Login extends Component {

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
       //check if authenticated
       if(nextProps.auth.isAuthenticated){
           //redirect to dashboard
           this.props.history.push('/dashboard');
       }

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

        const { errors } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.onLogin}>
                    
                    <input name="email" type="email" placeholder="email" value={this.state.email} onChange={this.onInputChange}/> <br /><br />
            
                    <input name="password" type="password" placeholder="password" value={this.state.password} onChange={this.onInputChange}/> <br /><br />
                   
                    <input type="submit" value="Login"/>
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