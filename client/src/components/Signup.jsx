import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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
  VStack,
} from '@chakra-ui/react';

function Signup() {
  const { login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { onChange, onSubmit, values } = useForm(() => signupUserCallback(), {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(ADD_USER, {
    update(_, { data: { addUser: { token, user } } }) {
      login(token); 
      localStorage.setItem('jwtToken', token); 
      navigate('/'); 
    },
    onError(err) {
     
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function signupUserCallback() {
    addUser();
  }

  return (
    <Container centerContent>
      <Box padding="4" maxWidth="md" width="100%">
        <VStack spacing={6}>
          <Heading>Signup</Heading>
          <form onSubmit={onSubmit} noValidate>
            <FormControl isInvalid={errors.username} id="username">
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Your username"
                name="username"
                value={values.username}
                onChange={onChange}
              />
              {errors.username && <FormErrorMessage>{errors.username}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.email} id="email" mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Your email address"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
              />
              {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.password} id="password" mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Choose a password"
                name="password"
                type="password"
                value={values.password}
                onChange={onChange}
              />
              {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword} id="confirmPassword" mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm your password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={onChange}
              />
              {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
            </FormControl>

            <Button
              mt={4}
              colorScheme="blue"
              isLoading={loading}
              type="submit"
              width="full"
            >
              Signup
            </Button>
          </form>
          <Button
            mt={4}
            variant="outline"
            width="full"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}

export default Signup;

