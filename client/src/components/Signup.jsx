import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from '../utils/state';
import { AuthContext } from '../context/AuthContext';
import { ADD_USER } from '../utils/mutations'; 
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Container,
  Heading,
  Box,
} from '@chakra-ui/react';

function Signup() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(signupUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(ADD_USER, {
    update(_, { data: { addUser: { token, user } } }) {
      context.login(user);
      localStorage.setItem('jwtToken', token);
      // Update navigation using useNavigate if using react-router-dom v6
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function signupUser() {
    addUser();
  }

  return (
    <Container centerContent>
      <Box padding="4" maxWidth="md" width="100%">
        <Heading marginBottom="6">Signup</Heading>
        <form onSubmit={onSubmit} noValidate>
          <FormControl isInvalid={errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email} marginTop="4">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} marginTop="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPassword} marginTop="4">
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
            />
            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            marginTop="6"
            isLoading={loading}
            loadingText="Submitting"
          >
            Signup
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Signup;
