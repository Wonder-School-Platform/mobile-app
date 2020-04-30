import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Icons from './Icons';
import styled from 'styled-components';

const MainMenu = () => {
  return (
    <MainNavigation style={styles.shadow}>
      <Icons.Home fill={'#7e7e7e'} />
      <Icons.Menu fill={'#7e7e7e'} />
      <Icons.Calendar fill={'#7e7e7e'} />
      <Icons.More fill={'#7e7e7e'} />
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