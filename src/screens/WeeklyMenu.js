import React from 'react';
import {Text} from 'react-native';
import TheMenu from '../containers/Menu';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PostListSkeleton from '../containers/PostListSkeleton';
import DataError from '../components/DataError';
import NoEvents from '../components/NoEvents';


const WEEKLY_MENU_POSTS_QUERY = gql`
  query WEEKLY_MENU_POSTS_QUERY {
    tags(where: {name: ["lunch", "breakfast"]}, last: 10) {
      edges {
        node {
          slug
          events {
            edges {
              node {
                databaseId
                title
                content
                start_date
                tags {
                  edges {
                    node {
                      slug
                      name
                    }
                  }
                }
                featuredImage {
                  sourceUrl(size: MEDIUM)
                }
              }
            }
          }
        }
      }
    }
  }
`
const WeeklyMenu = ({theme}) => {
  return (
    <Query query={WEEKLY_MENU_POSTS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <PostListSkeleton />;
        if (error) return <DataError />;
        if (!data.tags.edges.length) return <Text>There are no posts.</Text>;

        return (
          <NoEvents>The menu is going to be available soon.</NoEvents>
        );
      }}
    </Query>
  );
};

/* return (
    <TheMenu data={data} theme={theme} />
  );
*/

export default WeeklyMenu;