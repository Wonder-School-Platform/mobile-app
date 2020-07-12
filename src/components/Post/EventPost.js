import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import ScalableText from 'react-native-text';
import { scaleText } from 'react-native-text';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import HTML from 'react-native-render-html';

import { CardContainer, FeaturedImage, Header, Container, Title, Date, Location, LikesRow } from './Styles';
import { IconContainer, Icon } from '../../theme/Styles';
import * as Icons from '../Icons';
import {Ionicons} from '@expo/vector-icons';

const heightFeature = Dimensions.get('window').width * 0.5;
const heightFeaturePx = heightFeature + 'px';

const Post = (props) => {
  const {
    eventId,
    title,
    start_date,
    end_date,
    all_day,
    eventCategories,
    featuredImage,
    excerpt,
    venue,
    venuesList,
    organizersList,
    selectedDate,
    show,
    theme
  } = props;
  const navigation = useNavigation();
  const handlePress = () => navigation.navigate('Full Event', {
    eventId: eventId,
    venuesList: venuesList,
    organizersList: organizersList
  });

  const eventVenue = venuesList.edges.filter(filtered => filtered.node.eventId === parseInt(venue));
  //validate category is not "lunch-menu"
  const validCategory = eventCategories.edges.length > 0 && eventCategories.edges[0].node.slug !== 'lunch-menu';
  const regex = /(<([^>]+)>)/ig;
  var resultExce = excerpt.replace(regex, '');

  if (show === true && validCategory === true) {
    return (
      <CardContainer style={styles.shadow}>
        {featuredImage && <FeaturedImage source={{ uri: featuredImage.sourceUrl }} Hheight={heightFeaturePx} />}
        <View style={{ paddingHorizontal: 21 }}>
          <Header>
            {!eventCategories === null &&
              <IconContainer style={styles.iconContainer}>
                <Icon style={styles.icon} source={{ uri: eventCategories.edges[0].node.categoryIcon.categoryIcon.sourceUrl }} />
              </IconContainer>
            }
            <Container style={{ paddingHorizontal: 0 }}>
              <Title numberOfLines={1} onPress={handlePress}>
                <ScalableText style={styleTitle}>
                  {title}
                </ScalableText>
              </Title>
              {all_day !== 'yes' ?
                <Date>
                  <ScalableText style={styleDate}>
                    {moment(start_date).format('MMM DD, YYYY')}
                  </ScalableText>  
                </Date>
                :
                <Date>
                  <ScalableText style={styleDate}>
                    All Day
                  </ScalableText>  
                </Date>
              }
              {venue && <Location>{eventVenue.map(element => element.node.title)}</Location>}
            </Container>
            {!eventCategories === null &&
              eventCategories.edges[0].node.slug === 'food' && <Icons.ArrowRight style={{ alignSelf: 'flex-start' }} fill={theme.colors.primary} />
            }
          </Header>
          <Container>
            {excerpt !== "" &&
              <ScalableText numberOfLines={2} style={paragraph} >{resultExce}</ScalableText>
            }
            {/* <LikesRow>
              <Icons.Like fill={likes ? theme.colors.primary : theme.colors.icon} />
              {likes &&
                <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
                  {likes} Likes
                </Text>
              }
            </LikesRow> */}
          </Container>
        </View>
      </CardContainer >
    );
  } else {
    return null
  }

};

const styles = StyleSheet.create({
  shadow: {
    margin: 4,
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 3,
    marginBottom: 10
  },
  iconContainer: {
    width: Dimensions.get('window').width / 8,
    height: Dimensions.get('window').width / 8
  },
  icon: {
    width: Dimensions.get('window').width / 13,
    height: Dimensions.get('window').width / 13
  },
});

//HTML Component Styles
const paragraph = {
  fontFamily: 'Lato-Light',
  fontSize: 17,
  marginBottom: 10, 
  lineHeight: 18 * 1.2,
  color: '#202020',
}

const styleTitle = scaleText({
  fontSize: 18,
  lineHeight: 18 * 1.2,
  fontWeight: 600,
});

const styleDate = scaleText({
  fontSize: 16,
  lineHeight: 16 * 1.2,
});


export default Post;