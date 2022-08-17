import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import * as Sentry from "@sentry/react";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signUpStart } from '../../store/user/user.action';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields; 
    const dispatch = useDispatch();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();

        // Sentry.addBreadcrumb({
        //   category: "auth",
        //   message: "Custom Breadcrumb: Clicked Sign Up",
        // });
    
        if (password !== confirmPassword) {
          alert("passwords don't match");
          return;
        }
    
        try {
          dispatch(signUpStart(email, password, displayName))
          resetFormFields();
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
          } else {
            console.log('user creation encountered an error', error);
          }
        };
      };

      const brokenFunction = async (event) => {
        event.preventDefault();

        // Sentry.addBreadcrumb({
        //   category: "auth",
        //   message: "Custom Breadcrumb: Clicked Broken Button",
        // });
        // this will cause an error
        var foo = null;
        alert("triggering an error - check sentry")
        return foo.bar;
      }


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput label='Display Name' type="text" required onChange={handleChange} 
                name='displayName' value={displayName}/>

                <FormInput label="Email" type="email" required onChange={handleChange} 
                name='email' value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} 
                name='password' value={password}/>

                <FormInput label="Confirm Password" type="password" required onChange={handleChange} 
                name='confirmPassword' value={confirmPassword}/>

                <Button aria-label="Sign Up Button"  type="submit">Sign Up</Button>

                <Button aria-label="Broken Sign Up Button" type="broken" onClick={brokenFunction} style={{"backgroundColor": "crimson", "marginTop": "20px"}}>
                  Broken sign up
                </Button>

            </form>
        </div>
    )
};

export default SignUpForm; 

