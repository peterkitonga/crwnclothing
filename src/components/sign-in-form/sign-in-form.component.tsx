import React, { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

import './sign-in-form.styles.scss';
import {
  createUserDocFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '@utils/firebase.utils';
import Button from '@components/button/button.component';
import FormInput from '@components/form-input/form-input.component';

export default function SignInForm() {
  const defaultFormFields = {
    email: '',
    password: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate();

  const resetFormFields = () => setFormFields(defaultFormFields);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onHandleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { email, password } = formFields;

    if (password.length < 6) {
      return alert('Password is too short!');
    } else {
      try {
        await signInAuthUserWithEmailAndPassword(email, password);

        resetFormFields();
        navigate('/shop');
      } catch (err) {
        const error = err as FirebaseError;

        if (error.code === 'auth/invalid-credential') {
          alert('Email or password is invalid!');
        } else if (error.code === 'auth/invalid-email') {
          alert('Email is invalid!');
        } else {
          console.error('Error signing in user with email:', error.message);
        }
      }
    }
  };

  const onAuthenticateGoogleUser = async () => {
    try {
      const { user } = await signInWithGooglePopup();

      await createUserDocFromAuth(user);

      navigate('/shop');
    } catch (e) {
      const error = e as FirebaseError;

      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className={`sign-in-container`}>
      <h2>Already have an account</h2>
      <span>Sign In with your Email and Password</span>
      <form onSubmit={onHandleSubmit}>
        <FormInput
          type="email"
          name={'email'}
          autoComplete="hidden"
          label={'Email'}
          id={'sign-in-email'}
          value={formFields.email}
          changeHandler={onHandleChange}
          required={true}
        />

        <FormInput
          type="password"
          name={'password'}
          autoComplete="hidden"
          label={'Password'}
          id={'sign-in-password'}
          value={formFields.password}
          changeHandler={onHandleChange}
          required={true}
        />

        <div className={'buttons-container'}>
          <Button type={'submit'}>Sign In</Button>
          <Button buttonType={'google'} type={'button'} onClick={onAuthenticateGoogleUser}>
            Google Sign-In
          </Button>
        </div>
      </form>
    </div>
  );
}
