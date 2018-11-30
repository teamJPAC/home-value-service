import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { PreQuery } from './components/PreQuery.js';

const port = 8081;

const altUrl = `http://localhost:5000/graphql`

const graph = `/graphql`

const client = new ApolloClient({
  uri: graph,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <PreQuery />
  </ApolloProvider>,
  document.getElementById('main'),
);
