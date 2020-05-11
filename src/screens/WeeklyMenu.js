import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import { FeaturedImage, MainImg, IconContainer, PostHeader, PostHeaderContainer, PostDetails, Title, Paragraph, Note, LikesRow, LikesText } from '../theme/Styles';
import * as Icons from '../components/Icons';
import Theme from '../theme/Theme';

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
      <PostHeader style={styles.shadow}>
        <IconContainer>
          <Icons.Food fill='#ffffff' />
        </IconContainer>
        <PostHeaderContainer>
          <Title>This is the menu</Title>
          <PostDetails>These are post details</PostDetails>
        </PostHeaderContainer>
      </PostHeader>
      <View style={styles.paddingH}>
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
          <Icons.Like fill={Theme.colors.primary} />
          <LikesText>
            22 Likes
          </LikesText>
        </LikesRow>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  paddingH: {
    paddingHorizontal: 24
  },
  shadow: {
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 4,
  }
})

export default WeeklyMenu;