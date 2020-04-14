import React from 'react';
import { View, Text, Image } from 'react-native';
import { Paragraph } from '../theme/Styles';
import styled from 'styled-components';

export const CardContainer = styled.View`
  background: white;
  border-radius: 10px;
  padding: 16px 0 24px 0;
  justify-content:flex-start;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;
  elevation: 2;
  margin-bottom: 16px;
`
const FeaturedImage = styled.Image`
  border-radius:10px;
  height: 212px;
  width:100%;
  margin:-16px 0 32px;
`
const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom:16px;
  min-height: 48px;
`
const Icon = styled.View`
  align-self: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius:24px;
  justify-content: center;
  height:48px;
  margin-right:12px;
  width:48px;
`
const Container = styled.View`
  flex:1 1 auto;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.titles};
  flex:1 1 auto;
  flex-wrap: wrap;
  margin-bottom:8px;
`
const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.titles};
  flex:1 1 auto;
  flex-wrap: wrap;
`
const Post = (props) => {
  const { category } = props;
  let iconType;
  switch (category) {
    case 'menu':
      iconType = require('../images/icon-food.png');
      break;
    case 'football':
      iconType = require('../images/icon-football.png');
      break;
    case 'winter':
      iconType = require('../images/icon-snow.png');
      break;
    default:
      break;
  }
  return (
    <CardContainer>
      <FeaturedImage source={require('../images/college-football.jpg')} />
      <View style={{ paddingHorizontal: 21 }}>
        <Header>
          <Icon>
            <Image
              source={iconType}
              style={{ width: 24, height: 24 }}
            />
          </Icon>
          <Container style={{ paddingHorizontal: 0 }}>
            <Title>This week's menu</Title>
            <Date>Monday 13th, 7:00 p.m. School Football field</Date>
          </Container>
          {category === 'menu' && <Image source={require('../images/icon-arrow.png')} />}
        </Header>
        <Container>
          <Paragraph>
            Our menu is now available including pizza, chilli, enchiladas and more.
          </Paragraph>
        </Container>
      </View>
    </CardContainer >
  );
};

export default Post;