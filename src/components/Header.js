import React from 'react';
import styled from 'styled-components';
import { SafeAreaView } from 'react-native';

const Topbar = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 24px;
`

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.overPrimary};
  font-family: 'Muli-Bold';
`

const Header = (props) => {
  const { title, school, currentScreen } = props;
  return (
    <SafeAreaView>
      <Topbar>
        <Title style={{ fontSize: currentScreen === 'Home' ? 22 : 18 }}>
          {currentScreen === 'Home' ? school : title}
        </Title>
      </Topbar>
    </SafeAreaView>
  );
};

export default Header;