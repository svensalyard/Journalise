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
} from '@chakra-ui/react';

function Login() {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: { token, user } } }) {
            context.login(user);
            localStorage.setItem('jwtToken', token);
            navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <Container centerContent>
            <Box padding="4" maxWidth="md" width="100%">
                <Heading marginBottom="6">Login</Heading>
                <form onSubmit={onSubmit} noValidate>
                    <FormControl isInvalid={errors.email} marginBottom="4">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email.."
                            value={values.email}
                            onChange={onChange}
                        />
                        {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
                    </FormControl>

                    <FormControl isInvalid={errors.password} marginBottom="6">
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password.."
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
                {Object.keys(errors).length > 0 && (
                    <Box className="ui error message" marginTop="4">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default Login;


