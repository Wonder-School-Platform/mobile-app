import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  View
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import HTML from 'react-native-render-html';
import ScalableText from 'react-native-text';
import {Linking} from 'expo';
import { Icon, IconContainer, PostHeader, PostHeaderContainer, Title, Container } from '../theme/Styles';
import { Date } from '../components/Post/Styles';
import Theme from '../theme/Theme';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';

const POST_QUERY = gql`
  query POST_QUERY($postId: Int) {
    postBy(postId: $postId) {
      databaseId
      title
      date
      content
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
`

const FullPost = ({ route, theme }) => {
  const postId = route.params.postId;
  return (
    <Query query={POST_QUERY} variables={{ postId }}>
      {({ loading, error, data }) => {
        if (loading) return <PostSkeleton />;
        if (error) return <DataError />;
        if (!data) return <Text>There is no data.</Text>

        const {
          categories,
          date,
          featuredImage,
          title,
          content,
        } = data.postBy;

        //Clean shorcodes from conten
        const regex = /\[[^\]]+\]/g;
        const cleanedContent = content.toString().replace(regex, '');

        return (
          <SafeAreaView>
            <ScrollView>
              {featuredImage && <Image source={{ uri: featuredImage.sourceUrl }} style={styles.mainImage} />}
              <View style={{ paddingTop: featuredImage ? 0 : 48}}>
                <PostHeader style={styles.shadow}>
                  {categories.edges.length > 0 &&
                    <IconContainer>
                      <Icon style={{ width: 24, height: 24 }} source={{ uri: categories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
                    </IconContainer>
                  }
                  <PostHeaderContainer>
                    <Title>{title}</Title>
                    <Date>{moment(date).format('MMM DD, YYYY')}</Date>
                  </PostHeaderContainer>
                </PostHeader>
              </View>
              <Container>
                <HTML
                  html={cleanedContent}
                  baseFontStyle={{ fontFamily: 'Lato-Regular' }}
                  imagesMaxWidth={Dimensions.get('window').width - 48}
                  onLinkPress={(evt, href) => { Linking.openURL(href)}}
                  {...htmlStyles} />
              </Container>
            </ScrollView>
          </SafeAreaView>
        )
      }}
    </Query>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 4,
  },
  mainImage: {
    height: 212,
    resizeMode: 'cover',
  }
});

//HTML Component Styles
const htmlStyles = {
  tagsStyles: {
    p: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    a: {
      //color: theme.colors.primary,
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
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    ol: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    h1: {
      fontSize: 32.44,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h2: {
      fontSize: 28.83,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h3: {
      fontSize: 25.63,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h4: {
      fontSize: 22.78,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h5: {
      fontSize: 20.25,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h6: {
      fontSize: 18,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    }
  }
};

export default FullPost;
