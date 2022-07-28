import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, ApolloLink } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import 'moment/dist/locale/pt-br';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { Home } from './pages/home';
import { Login } from './pages/login/login';
import { theme } from './styles/theme';

const link = from([
  new HttpLink({ uri: 'http://localhost:3003/graphql' })
]);

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default App
