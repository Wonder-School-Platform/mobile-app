import React from 'react';
import { View, Text, Image } from 'react-native';
import { Paragraph } from '../../theme/Styles';
import { CardContainer, FeaturedImage, Header, Container, Title, Date, Location, LikesRow } from './Styles';
import { Icon } from '../../theme/Styles';

import * as Icons from '../Icons';

const Post = (props) => {
  const {
    category,
    date,
    featuredImg,
    location,
    title,
    excerpt,
    likes,
    theme
  } = props;
  let iconType;
  switch (category) {
    case 'menu':
      iconType = <Icons.Food fill={theme.colors.overPrimary} />
      break;
    case 'football':
      iconType = <Icons.Football fill={theme.colors.overPrimary} />
      break;
    case 'winter':
      iconType = <Icons.Snow fill={theme.colors.overPrimary} />
      break;
    case 'culture':
      iconType = <Icons.Books fill={theme.colors.overPrimary} />
      break;
    default:
      break;
  }
  return (
    <CardContainer>
      {featuredImg && <FeaturedImage source={require('../../images/college-football.jpg')} />}
      <View style={{ paddingHorizontal: 21 }}>
        <Header>
          <Icon>
            {iconType}
          </Icon>
          <Container style={{ paddingHorizontal: 0 }}>
            <Title>{title}</Title>
            <Date>{date}</Date>
            <Location>{location}</Location>
          </Container>
          {category === 'menu' && <Icons.ArrowRight style={{ alignSelf: 'flex-start' }} fill={theme.colors.primary} />}
        </Header>
        <Container>
          {excerpt &&
            <Paragraph>
              {excerpt}
            </Paragraph>
          }
          <LikesRow>
            <Icons.Like fill={likes ? theme.colors.primary : theme.colors.icon} />
            {likes &&
              <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
                {likes} Likes
              </Text>
            }
          </LikesRow>
        </Container>
      </View>
    </CardContainer >
  );
};

export default Post;