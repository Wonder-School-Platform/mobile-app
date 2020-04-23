import React from 'react';
import styled from 'styled-components';
import { SafeAreaView, View, Text } from 'react-native';

const Topbar = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 24px;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.overPrimary};
  font-family: 'Muli-Bold';
  font-size: ${currentScreen === 'Home' ? '22px' : '18px'};
`

const Header = (props) => {
  const { title, school, currentScreen } = props;
  return (
    <SafeAreaView>
      <Topbar>
        <Title>
          {currentScreen === 'Home' ? school : title}
        </Title>
      </Topbar>
    </SafeAreaView>
  );
};

export default Header;