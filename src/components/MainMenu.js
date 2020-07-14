import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons';

const MainMenu = () => {
  return (
    <MainNavigation style={styles.shadow}>
      <Ionicons name={'md-home-outline'} size={25} color={'#7e7e7e'} />
      <Ionicons name={'md-room_service'} size={25} color={'#7e7e7e'} />
      <Ionicons name={'md-insert_invitation'} size={25} color={'#7e7e7e'} />
      <Ionicons name={'md-more'} size={25} color={'#7e7e7e'} />
      /*<Icons.Home fill={'#7e7e7e'} />
      <Icons.Menu fill={'#7e7e7e'} />
      <Icons.Calendar fill={'#7e7e7e'} />
      <Icons.More fill={'#7e7e7e'} />*/
    </MainNavigation>
  );
};

const MainNavigation = styled.View`
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
  padding:24px;
`
const styles = StyleSheet.create({
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
export default MainMenu;