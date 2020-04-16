import React from 'react';
import { View, Text, Image } from 'react-native';
import { Paragraph } from '../../theme/Styles';
import { CardContainer, FeaturedImage, Header, Icon, Container, Title, Date, LikesRow } from './Styles';

import * as Icons from '../Icons';

const Post = (props) => {
  const { category, theme } = props;
  let iconType;
  switch (category) {
    case 'menu':
      iconType = <Icons.Food fill={theme.colors.overPrimary} />
      break;
    case 'football':
      iconType = <Icons.Football fill={'#fff000'} />
      break;
    case 'winter':
      iconType = <Icons.Snow fill={'#fff000'} />
      break;
    default:
      break;
  }
  return (
    <CardContainer>
      <FeaturedImage source={require('../../images/college-football.jpg')} />
      <View style={{ paddingHorizontal: 21 }}>
        <Header>
          <Icon>
            {iconType}
          </Icon>
          <Container style={{ paddingHorizontal: 0 }}>
            <Title>This week's menu</Title>
            <Date>Monday 13th, 7:00 p.m. School Football field</Date>
          </Container>
          {category === 'menu' && <Icons.Arrow style={{ alignSelf: 'flex-start' }} fill={theme.colors.primary} />}
        </Header>
        <Container>
          <Paragraph>
            Our menu is now available including pizza, chilli, enchiladas and more.
          </Paragraph>
          <LikesRow>
            <Icons.Like fill={'#000000'} />
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