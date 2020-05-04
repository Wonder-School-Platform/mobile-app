import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://wschoolsdev.wpengine.com/graphql'
});

export default client;