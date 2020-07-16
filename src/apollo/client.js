import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

export const schoolClient = new ApolloClient({
  cache,
  uri: 'http://catoosa.wschoolsdev.wpengine.com/graphql',
  resolvers: {}
});

export const keystoneClient = new ApolloClient({
  cache,
  uri: 'http://keystone.wschoolsdev.wpengine.com/graphql',
  resolvers: {}
});
