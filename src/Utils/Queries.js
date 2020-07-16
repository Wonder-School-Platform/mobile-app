import gql from 'graphql-tag';

export const APP_SETTINGS = gql`
  {
    appSettings {
      color_settings {
        backgroundColor
        borderColor
        cardColor
        iconColor
        primaryColor
        primaryLighter
        textColor
      }
      school_settings {
        schoolName
        schoolLogo {
          sourceUrl
        }
      }
    }
  }
`
//Keystone App Queries
export const ALL_KEYSTONE_POSTS = gql`
  query ALL_KEYSTONE_POSTS {
    posts {
      edges {
        node {
          title
        }
      }
    }
  }
`