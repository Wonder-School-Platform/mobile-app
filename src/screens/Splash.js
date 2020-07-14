import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';

const Splash = () => {
  return (
    <Logo>
      <Image source={require('../images/logo.png')} />
    </Logo>
  );
};

const Logo = styled.View`
  flex: 0 0 100%;
  justify-content: center;
  align-items: center;
`

export default Splash;