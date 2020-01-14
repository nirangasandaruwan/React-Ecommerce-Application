import React,{useState} from 'react';
import {connect} from 'react-redux';


import './sign-in.style.scss';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component.jsx';

import {signInWithGoogle} from '../../firebase/firebase.utils';
import { googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';



const SignIn = ({emailSignInStart,googleSignInStart}) =>{


    const [userCredentials,setCredentials] = useState({email:'',password:''});

    const {email,password} = userCredentials;
 


    const handleSubmit = event => {


        event.preventDefault();
        
        

        emailSignInStart(email,password);

        

    }


    const handleChange= event => {
        const {value,name} = event.target;

        setCredentials({...userCredentials,[name]: value});
    }



    

        

        return(

            <div className='sign-in'>

            <h2>I already have a acoount</h2>
            <span>Sign in with your email and password</span>
             

             <form onSubmit={handleSubmit}>
            <FormInput name='email' label='email' type='email' handleChange={handleChange} value={email} required/>
            

            <FormInput name='password' label='password' type='password' handleChange={handleChange} value={password} required/>
           
         <div className='buttons'>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                
            

                Sign In Google 
                
                
                
                </CustomButton>

                </div>

             </form>


             



            </div>

        )

    }






const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password}))
})


export default connect(null,mapDispatchToProps)(SignIn); 







