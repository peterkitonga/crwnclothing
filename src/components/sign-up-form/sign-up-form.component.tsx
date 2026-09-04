import React, { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { UserCredential } from 'firebase/auth';

import './sign-up-form.styles.scss';
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from '@utils/firebase.utils';
import Button from '@components/button/button.component';
import FormInput from '@components/form-input/form-input.component';

export default function SignUpForm() {
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const onHandleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = formFields;

    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    } else {
      try {
        const { user } = (await createAuthUserWithEmailAndPassword(email, password)) as UserCredential;

        await createUserDocFromAuth(user, { displayName });

        resetFormFields();
      } catch (err) {
        const error = err as FirebaseError;

        if (error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use!');
        } else {
          console.error('Error signing up user with email:', error.message);
        }
      }
    }
  };

  return (
    <div className={`sign-up-container`}>
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with Email and Password</span>
      <form onSubmit={onHandleSubmit}>
        <FormInput
          type="text"
          name={'displayName'}
          autoComplete="hidden"
          label={'Display Name'}
          id={'sign-up-display-name'}
          value={formFields.displayName}
          changeHandler={onHandleChange}
          required={true}
        />

        <FormInput
          type="email"
          name={'email'}
          autoComplete="hidden"
          label={'Email'}
          id={'sign-up-email'}
          value={formFields.email}
          changeHandler={onHandleChange}
          required={true}
        />

        <FormInput
          type="password"
          name={'password'}
          autoComplete="hidden"
          label={'Password'}
          id={'sign-up-password'}
          value={formFields.password}
          changeHandler={onHandleChange}
          required={true}
        />

        <FormInput
          type="password"
          name={'confirmPassword'}
          autoComplete="hidden"
          label={'Confirm Password'}
          id={'sign-up-confirm'}
          value={formFields.confirmPassword}
          changeHandler={onHandleChange}
          required={true}
        />

        <Button type={'submit'}>Sign Up</Button>
      </form>
    </div>
  );
}
