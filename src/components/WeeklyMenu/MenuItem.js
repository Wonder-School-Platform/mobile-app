import React from 'react';
import styled from 'styled-components';
import { View, Text, Image, FlatList } from 'react-native';
import WeekNavigation from './WeekNavigation';
import MenuHeader from './MenuHeader';
import MenuContent from './MenuContent';

export const FeaturedImage = styled.View`
  background: ${({ theme }) => theme.colors.primaryLighten};
  flex:0 0 320px;
  overflow: hidden;
  width: 100%;
`
const MenuImg = styled.Image`
  height:100%;
  left:0;
  position: absolute;
  top:0;
  width:100%;
`

const MenuItem = (props) => {
  const { theme } = props;
  return (
    <>
      <FeaturedImage>
        <MenuImg source={require('../../images/pizza-menu.jpg')} />
        <WeekNavigation />
      </FeaturedImage >
      <MenuHeader
        title='Pizza Salad & Carrots'
        date='Tuesday, March 12th.'
      />
      <MenuContent />
    </>
  );
};

export default MenuItem;