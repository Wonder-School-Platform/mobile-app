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
  uri: 'http://catoosa.schoolhousesolutions.com/graphql',
  resolvers: {}
});

export const keystoneClient = new ApolloClient({
  cache,
  uri: 'https://lunchroomzoom.com/graphql',
  resolvers: {}
});
