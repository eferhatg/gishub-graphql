import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloProvider} from 'react-apollo'
import {BrowserRouter} from 'react-router-dom'
import {withClientState} from 'apollo-link-state';
import { onError } from "apollo-link-error";
import './index.css';

import {ApolloLink} from 'apollo-link';

import App from './app'

import {AppDefaults} from './config/appDefaults';

const cache = new InMemoryCache();

const stateLink = withClientState({cache, defaults: AppDefaults});

const errorlink = onError(({ operation,response,graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({

  link: ApolloLink.from([
    stateLink,
    new HttpLink({uri: 'http://localhost:4444/graphql'}),
    errorlink
  ]),
  cache: cache,
  connectToDevTools: true
})

ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
</BrowserRouter>, document.getElementById('root'))