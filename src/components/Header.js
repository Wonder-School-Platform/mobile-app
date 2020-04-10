import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native';

const Topbar = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 24px;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.overPrimary};
  font-size: ${({ theme }) => theme.fontSizes.title};
`

const Header = () => {
  return (
    <SafeAreaView>
      <Topbar>
        <Title>Custom School Name</Title>
      </Topbar>
    </SafeAreaView>
  );
};

export default Header;