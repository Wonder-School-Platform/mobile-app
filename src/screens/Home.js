import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PostList from '../containers/PostList';
import PostListSkeleton from '../containers/PostListSkeleton';
import DataError from '../components/DataError';

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY( $cursor: String) {
    posts(first: 12, after: $cursor) {
      edges {
        node {
          databaseId
          title
          date
          excerpt
          featuredImage {
            id
            sourceUrl
          }
          categories {
            edges {
              node {
                categoryIcon {
                  categoryIcon {
                    sourceUrl(size: MEDIUM)
                  }
                }
                slug
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const Home = (props) => {
  const { theme } = props;
  return (
    <Query query={ALL_POSTS_QUERY}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <PostListSkeleton />;
        if (error) return <DataError />;
        if (!data.posts.edges.length) return <Text>There are no posts.</Text>;
        return (
          <PostList data={data.posts} theme={theme} fetchMore={fetchMore} />
        );
      }}
    </Query >
  );
};

export default Home;
