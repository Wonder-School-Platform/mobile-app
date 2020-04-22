import React from 'react';
import { View, FlatList, Text } from 'react-native';
import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import { FeaturedImage, MainImg, Icon, PostHeader, PostHeaderContainer, PostDetails, Title, Paragraph, Note, LikesRow } from '../theme/Styles';
import * as Icons from '../components/Icons';

const WeeklyMenu = () => {
  const Notes = [
    {
      note: 'All menus are subject to change.',
      id: '1'
    },
    {
      note: 'No artificial flavors, colors, or sweeteners are used in any school meal.',
      id: '2'
    },
  ];
  return (
    <>
      <FeaturedImage>
        <MainImg source={require('../images/pizza-menu.jpg')} />
        <WeekNavigation />
      </FeaturedImage >
      <PostHeader>
        <Icon>
          <Icons.Food fill='#ffffff' />
        </Icon>
        <PostHeaderContainer>
          <Title>This is the menu</Title>
          <PostDetails>These are post details</PostDetails>
        </PostHeaderContainer>
      </PostHeader>
      <View style={{ paddingHorizontal: 24 }}>
        <Title>Description</Title>
        <Paragraph>Pepperonni pizza with carrots, and caesar salad. Strawberry sauce for dessert.</Paragraph>
        <Title>Allergens information</Title>
        <Paragraph>Allergens information</Paragraph>
        <Title>Notes</Title>
        <FlatList
          data={Notes}
          renderItem={({ item }) => <Note>{`• ${item.note}`}</Note>}
          keyExtractor={item => item.id}
        />
        <LikesRow>
          <Icons.Like fill='#ff0000' />
          <Text style={{ marginLeft: 8, fontWeight: 'bold' }}>
            22 Likes
          </Text>
        </LikesRow>
      </View>
    </>
  );
};

export default WeeklyMenu;