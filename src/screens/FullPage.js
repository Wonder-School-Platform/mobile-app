import React from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import HTML from 'react-native-render-html';

import { Container } from '../theme/Styles';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';
import Theme from '../theme/Theme';

const PAGE_QUERY = gql`
  query PAGE_QUERY($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      content(format: RENDERED)
    }
  }
`

const FullPage = ({ route, theme }) => {
  const databaseId = route.params.id;
  const { loading, error, data } = useQuery(PAGE_QUERY, {
    variables: { id: databaseId }
  });
  if (loading) return <PostSkeleton />
  if (error) return <DataError />

  const { content } = data.page;

  //Clean shorcodes from conten
  const regex = /\[[^\]]+\]/g;
  const cleanedContent = content.toString().replace(regex, '');

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <HTML
            html={cleanedContent}
            baseFontStyle={{ fontFamily: 'Lato-Regular' }}
            imagesMaxWidth={Dimensions.get('window').width - 48}
            {...htmlStyles} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

//HTML Component Styles
const htmlStyles = {
  tagsStyles: {
    p: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    a: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    img: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      marginBottom: 32,
      marginTop: 16,
    },
    ul: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    ol: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26
    },
    h1: {
      fontSize: 32.44,
      marginBottom: 16
    },
    h2: {
      fontSize: 28.83,
      marginBottom: 16
    },
    h3: {
      fontSize: 25.63,
      marginBottom: 16
    },
    h4: {
      fontSize: 22.78,
      marginBottom: 16
    },
    h5: {
      fontSize: 20.25,
      marginBottom: 16
    },
    h6: {
      fontSize: 18,
      marginBottom: 16
    }
  }
};

export default FullPage;
