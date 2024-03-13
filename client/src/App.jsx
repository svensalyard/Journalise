import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

// Import context and route components
import { AuthProvider } from './context/AuthContext';
import AuthRoute from './routes/AuthRoutes';

// Import page and component modules
import Home from './pages/Home';
import Categories from './pages/Categories';
import Popular from './pages/Popular';
import Profile from './pages/Profile';
import Login from './components/Login';
import Signup from './components/Signup';
import SinglePost from './components/Post';

// Apollo Client setup
const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <Container maxW="container.xl">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<AuthRoute element={<Login />} />} />
              <Route path="/signup" element={<AuthRoute element={<Signup />} />} />
              <Route path="/posts/:postId" element={<SinglePost />} />
            </Routes>
          </Container>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
