import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PostList from '../containers/PostList';
import PostListSkeleton from '../containers/PostListSkeleton';

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY {
    posts {
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
    }
  }
`;

const Home = (props) => {
  const { theme } = props;
  return (
    <Query query={ALL_POSTS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <PostListSkeleton />;
        if (error) return <Text>Error :(</Text>;
        if (!data.posts.edges.length) return <Text>No matching posts found.</Text>;
        return (
          <PostList data={data.posts} theme={theme} />
        );
      }}
    </Query>
  );
};

export default Home;
