import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../utils/state'; 
import { AuthContext } from '../context/AuthContext';
import { LOGIN_USER } from '../utils/mutations';
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

function Login() {
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            console.log('Login data:', userData);
            login(userData.token); 
            navigate('/postform'); 
        },
        onError(err) {
            
            const graphQLErrors = err?.graphQLErrors?.[0]?.extensions?.exception?.errors;
            const newErrors = graphQLErrors ? graphQLErrors : { general: "Failed to login. Please try again." };
            setErrors(newErrors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <Container centerContent>
            <Box padding="4" maxWidth="md" width="100%">
                <VStack spacing={4}>
                    <Heading marginBottom="6">Login</Heading>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        loginUserCallback();
                    }} noValidate>
                        <FormControl isInvalid={errors.username} marginBottom="4">
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username..."
                                value={values.username}
                                onChange={onChange}
                            />
                            {errors.username && <FormErrorMessage>{errors.username}</FormErrorMessage>}
                        </FormControl>

                        <FormControl isInvalid={errors.password} marginBottom="6">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password..."
                                value={values.password}
                                onChange={onChange}
                            />
                            {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
                        </FormControl>

                        <Button
                            type="submit"
                            colorScheme="blue"
                            isLoading={loading}
                            loadingText="Logging in..."
                            width="full"
                        >
                            Login
                        </Button>
                    </form>
                    <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        width="full"
                    >
                        Back to Home
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
}

export default Login;
