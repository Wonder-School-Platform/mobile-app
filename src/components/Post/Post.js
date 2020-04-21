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
          <Paragraph>
            Our menu is now available including pizza, chilli, enchiladas and more.
          </Paragraph>
          <LikesRow>
            <Icons.Like fill={theme.colors.primary} />
            <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
              22 Likes
            </Text>
          </LikesRow>
        </Container>
      </View>
    </CardContainer >
  );
};

export default Post;