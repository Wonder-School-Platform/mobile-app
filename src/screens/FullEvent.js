import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  SafeAreaView
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import HTML from 'react-native-render-html';

import { Icon, IconContainer, PostHeader, PostHeaderContainer, PostDetails, Title, Container } from '../theme/Styles';
import { Date, Location } from '../components/Post/Styles';
import Theme from '../theme/Theme';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';

const EVENT_QUERY = gql`
  query EVENT_QUERY($eventId: Int) {
    eventBy(eventId: $eventId) {
      databaseId
      title
      date
      content
      start_date
      end_date
      all_day
      venue
      organizer
      featuredImage {
        id
        sourceUrl
      }
      eventCategories {
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


const FullEvent = ({ route }) => {
  const eventId = route.params.eventId;
  const venuesList = route.params.venuesList;
  const organizersList = route.params.organizersList;

  return (
    <Query query={EVENT_QUERY} variables={{ eventId }}>
      {({ loading, error, data }) => {
        if (loading) return <PostSkeleton />;
        if (error) return <DataError />;
        if (!data) return <Text>There is no data.</Text>

        const {
          eventId,
          title,
          date,
          content,
          start_date,
          end_date,
          all_day,
          venue,
          selectedDate,
          organizer,
          featuredImage,
          eventCategories,
        } = data.eventBy;

        const eventVenue = venuesList.edges.filter(filtered => filtered.node.databaseId === parseInt(venue));
        const eventOrganizer = organizersList.edges.filter(filtered => filtered.node.databaseId === parseInt(organizer));

        //Clean shorcodes from conten
        const regex = /\[[^\]]+\]/g;
        const cleanedContent = content.toString().replace(regex, '');

        return (
          <SafeAreaView>
            <ScrollView>
              {featuredImage !== null && <Image source={{ uri: featuredImage.sourceUrl }} style={styles.mainImage} />}
              <PostHeader style={styles.shadow}>
                {!eventCategories === null &&
                  <IconContainer>
                    <Icon style={{ width: 24, height: 24 }} source={{ uri: eventCategories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
                  </IconContainer>
                }
                <PostHeaderContainer>
                  <Title>{title}</Title>
                  {all_day !== 'yes' ?
                    <Date>{moment(start_date).format('MMM DD, YYYY')}</Date>
                    :
                    <Date>All Day</Date>
                  }
                  {venue && <Location>{eventVenue.map(element => element.node.title)}</Location>}
                  {organizer && <Location>Organized by {`${eventOrganizer.map(element => element.node.title)}`}</Location>}
                </PostHeaderContainer>
              </PostHeader>
              <Container>
                {content && 
                  <HTML
                    html={cleanedContent}
                    baseFontStyle={{ fontFamily: 'Lato-Regular' }}
                    {...htmlStyles} 
                  />
                }
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
      lineHeight: 26
    },
    a: {
      color: Theme.colors.primary,
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

export default FullEvent;
