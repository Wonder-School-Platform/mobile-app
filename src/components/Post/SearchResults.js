import React from 'react';
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

// This is the query that Apollo Client will send to the WP site.
const POSTS_SEARCH_QUERY = gql`
  query POSTS_SEARCH_QUERY($searchQuery: String!) {
    posts(where: { search: $searchQuery }) {
      edges {
        node {
          postId
          title
          date
        }
      }
    }
  }
`;

const SearchResults = ({ searchQuery }) => {
  return (
    <Query query={POSTS_SEARCH_QUERY} variables={{ searchQuery }}>
      {({ loading, error, data }) => {
        if (loading) return <Text>Loading...</Text>;
        if (error) return <Text>Error :(</Text>;
        if (!data.posts.edges.length) return <Text>No matching posts found.</Text>;

        return data.posts.edges.map(edge => {
          const { node: post } = edge;
          const { postId, title, date } = post;

          return (
            <View key={postId} style={{ marginBottom: 30 }}>
              <Text>This is the title: {title}</Text>
              <Text>This is the date: {moment(date).format('MMM DD, YY')}</Text>
            </View>
          );
        });
      }}
    </Query>
  );
};

export default SearchResults;