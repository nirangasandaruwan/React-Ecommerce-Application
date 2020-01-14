import React,{useEffect} from 'react';

import {HomePage} from './pages/homepage/homepage.component.jsx';

import './App.css';

import {Switch,Route,Redirect} from 'react-router-dom';


import ShopPage from './pages/shop/shop.component.jsx';

import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth,createUserProfileDocument} from './firebase/firebase.utils.js';

import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';

import { checkUserSession} from './redux/user/user.actions';




const  App = ({currentUser,checkUserSession}) => {


  

  

  useEffect(() => {
    checkUserSession();
  },[checkUserSession]); 
    

   

    

   
  



  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }




  return (
    <div>

      <Header/>

      <Switch>

<Route exact path='/' component={HomePage}></Route>
<Route  path='/shop' component={ShopPage}></Route>
<Route  path='/checkout' component={CheckoutPage}></Route>
<Route exact path='/signin'  render={() => currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>)}></Route>


</Switch>
    
      
    </div>
  );
}




const mapStateToProps = createStructuredSelector({
currentUser: selectCurrentUser,

});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
