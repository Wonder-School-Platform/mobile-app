import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Title, Content, Note, LikesRow } from './Styles'
import * as Icons from '../Icons';

const MenuContent = () => {
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
    <View style={{ paddingHorizontal: 24 }}>
      <Title>Description</Title>
      <Content>Pepperonni pizza with carrots, and caesar salad. Strawberry sauce for dessert.</Content>
      <Title>Allergens information</Title>
      <Content>Allergens information</Content>
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
  );
};

export default MenuContent;