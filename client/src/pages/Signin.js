import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import UserForm from '../components/UserForm';
import { SIGNIN_USER } from '../gql/mutation';

const Signin = props => {
  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });
  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signin" />
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default Signin;
