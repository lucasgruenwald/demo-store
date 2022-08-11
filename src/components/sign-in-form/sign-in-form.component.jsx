import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Sentry from "@sentry/react";
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';

const defaultFormFields = { email: '', password: '' };

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: "Custom Breadcrumb: Clicked Google Sign In",
    });
    dispatch(googleSignInStart())
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    Sentry.addBreadcrumb({
      category: "auth",
      message: "Custom Breadcrumb: Clicked Email Sign In",
    });

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
      
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password');
          break;
        case 'auth/user-not-found':
          alert('user not found');
          break;
        default:
          console.log(error);
      }
    }
  };

  const brokenFunction = async (event) => {
    event.preventDefault();

    Sentry.addBreadcrumb({
      category: "auth",
      message: "Custom Breadcrumb: Clicked Broken Button",
    });

    // this will cause an error
    var foo = null;
    alert("triggering an error - check sentry")
    foo.bar = 1;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
          <Button type='broken' onClick={brokenFunction} style={{"backgroundColor": "crimson", "marginTop": "20px"}}>
            Broken Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;