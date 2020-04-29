import React from 'react';
import { View } from 'react-native';
import * as Icons from './Icons';
import styled from 'styled-components';

const MainMenu = () => {
  return (
    <MainNavigation>
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
  elevation: 5;
`

export default MainMenu;