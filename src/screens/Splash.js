import React from 'react';
import { View, Image } from 'react-native';
import styled from 'styled-components';

const Logo = styled.View`
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
`

const Splash = () => {
  return (
    <Logo>
      <Image source={require('../images/ogs_logo.png')} />
    </Logo>
  );
};

export default Splash;