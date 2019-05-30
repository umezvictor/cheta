import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

//redux
import { Provider } from 'react-redux';//Provider provides the application with the store which hods the state
//provider has to wrap around everything

//redux store from store.js
import store from './store';

//components
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

/*
token will be lost after page refresh
the code below prevents that
*/
if(localStorage.jwtToken){
  //if jtwToken exists, set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and get user info and expiry
  const decoded = jwt_decode(localStorage.jwtToken);//decode token stored in localstorage
  //you can call any action from the store
  store.dispatch(setCurrentUser(decoded));

  //check for expired token and logout user automatically
  const currentTime = Date.now() / 1000;//date.now returns milliseconds, hence division by 1000
  //remember, jwt has a 'exp' expiry property
  if(decoded.exp < currentTime){
    //logout user
    store.dispatch(logoutUser());//every action can be accessed via the store

    //clear current profile

    //redirect to login
    window.location.href = '/login';
  }
}


function App() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

//C:\Program Files\MongoDB\Server\4.0\bin