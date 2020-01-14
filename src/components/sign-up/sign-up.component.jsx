import React,{useState} from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.style.scss';



const SignUp = () => {

    

    const [userCredentials,setUserCredentials] = useState({
            displayName: '',
            email: '',
            password: '',
            confirmedPassword:''
        });

        const {displayName,email,password,confirmedPassword} = userCredentials;
    

    const handleSubmit = async event => {
        event.preventDefault();

        

        if(password !== confirmedPassword) {
            alert("password dont match");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email,password);
            await createUserProfileDocument(user,{displayName});
            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmedPassword:''
            });

        }catch(error) {
            console.error(error);
        }
    }

    const handleChange = event => {
        const {name, value} = event.target;

        setUserCredentials({...userCredentials,[name]: value});
    }

    

        

        return(

            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign Up with your email and password</span>

                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput 
                    type='text' 
                    name='displayName' 
                    value={displayName} 
                    onChange={handleChange} 
                    label='Display Name'
                     required>

                     </FormInput>
                     <FormInput 
                    type='email' 
                    name='email' 
                    value={email} 
                    onChange={handleChange} 
                    label='Email'
                     required>
                         
                     </FormInput>
                     <FormInput 
                    type='password' 
                    name='password' 
                    value={password} 
                    onChange={handleChange} 
                    label='Password'
                     required>
                         
                     </FormInput>
                     <FormInput 
                    type='password' 
                    name='confirmedPassword' 
                    value={confirmedPassword} 
                    onChange={handleChange} 
                    label='Confirmed Password'
                     required>
                         
                     </FormInput>

            <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>
            </div>
        )
    }


export default SignUp;