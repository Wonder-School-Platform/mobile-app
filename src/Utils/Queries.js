import gql from 'graphql-tag';

export const ALL_POSTS_QUERY = gql`
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
        }
      }
    }
  }
`;