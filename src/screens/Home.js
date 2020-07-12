import React from 'react';
import { Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import PostList from '../containers/PostList';
import PostListSkeleton from '../containers/PostListSkeleton';
import DataError from '../components/DataError';

const ALL_POSTS_QUERY = gql`
  query ALL_POSTS_QUERY($cursor: String) {
    contentNodes(first: 64, where: {status: PUBLISH}, after: $cursor) {
      edges {
        node {
            id
          __typename
          ... on Post {
            databaseId
            postId
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
            contentType {
              node {
                name
              }
            }
            districtSchools {
              edges {
                node {
                  slug
                  name
                }
              }
            }
          }
          __typename
          ... on Event {
            eventId
            databaseId
            id
            title
            start_date
            end_date
            all_day
            eventCategories {
              edges {
                node {
                  name
                  slug
                  categoryIcon {
                    categoryIcon {
                      sourceUrl
                    }
                  }
                }
              }
            }
            excerpt
            cost
            venue
            organizer
            featuredImage {
              id
              sourceUrl
            }
            contentType {
              node {
                name
              }
            }
            districtSchools {
              edges {
                node {
                  slug
                  name
                }
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    eventVenues {
      edges {
        node {
          title
          databaseId
        }
      }
    }
    eventOrganizers {
      edges {
        node {
          title
          databaseId
        }
      }
    }
    districtSchools {
      edges {
        node {
          slug
        }
      }
    }
  }
`;

const Home = (props) => {
  const { theme, preferences } = props;
  return (
    <Query query={ALL_POSTS_QUERY}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <PostListSkeleton />;
        if (error) return <DataError />;
        if (!data.contentNodes.edges.length) return <Text>There are no posts.</Text>;

        return (
          <PostList
            data={data.contentNodes}
            venuesList={data.eventVenues}
            organizersList={data.eventOrganizers}
            theme={theme}
            preferences={preferences}
            fetchMore={fetchMore} />
        );
      }}
    </Query >
  );
};

export default Home;
