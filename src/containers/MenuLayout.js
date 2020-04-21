import React from 'react';
import styled from 'styled-components';
import { View, Text, Image, FlatList } from 'react-native';

import * as Icons from '../components/Icons';
import { Icon } from '../theme/Styles';

const FeaturedImage = styled.View`
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
const WeekNavigation = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.overPrimary};
  border-radius:10px;
  flex-direction: row;
  justify-content: space-between;
  margin: 24px;
  padding:8px;
  elevation:2;
`
const WeekDay = styled.View`
  background-color: ${props => props.active === true ? ({ theme }) => theme.colors.primaryLighten : 'transparent'};
  border-radius:24px;
  align-items: center;
  justify-content: center;
  height:48px;
  width:48px;
`
const Day = styled.Text`
  color: #353535;
  font-size: 12px;
`
const Date = styled.Text`
  color: ${props => props.active === true ? ({ theme }) => theme.colors.primary : '#4a4a4a'};
  font-size: 14px;
  font-weight: ${props => props.active === true ? 'bold' : 'normal'};
`
const MenuHeader = styled(WeekNavigation)`
  padding:16px;
  margin-top: -16px;
`
const HeaderContainer = styled.View`
  flex-direction: column;
  flex:1;
`
const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:18px;
  font-weight: bold;
  margin-bottom:5px;
`
const MenuDate = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size:12px;
`
const Content = styled.Text`
  font-size:18px;
  margin-bottom:13px;
`
const Note = styled.Text`
  font-size:18px;
`
export const LikesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top:16px;
`

const MenuLayout = (props) => {
  const { theme } = props;
  const Notes = [
    {
      note: 'All menus are subject to change.',
      id: '1'
    },
    {
      note: 'No artificial flavors, colors, or sweeteners are used in any school meal.',
      id: '2'
    },
  ]
  return (
    <>
      <FeaturedImage>
        <MenuImg source={require('../images/pizza-menu.jpg')} />
        <WeekNavigation>
          <Icons.ArrowLeft fill='#ff0000' />
          <WeekDay>
            <Day>Mon</Day>
            <Date>13</Date>
          </WeekDay>
          <WeekDay active={true}>
            <Day>Tue</Day>
            <Date active={true}>14</Date>
          </WeekDay>
          <WeekDay>
            <Day>Mie</Day>
            <Date>15</Date>
          </WeekDay>
          <WeekDay>
            <Day>Jue</Day>
            <Date>16</Date>
          </WeekDay>
          <WeekDay>
            <Day>Vie</Day>
            <Date>17</Date>
          </WeekDay>
          <Icons.ArrowRight fill='#ff0000' />
        </WeekNavigation>
      </FeaturedImage >
      <MenuHeader>
        <Icon>
          <Icons.Food fill='#ff0000' />
        </Icon>
        <HeaderContainer>
          <Title>Pizza, salad & carrots</Title>
          <MenuDate>Menu for Tuesday, March 12.</MenuDate>
        </HeaderContainer>
      </MenuHeader>
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
    </>
  );
};

export default MenuLayout;