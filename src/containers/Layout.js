import React from 'react';
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components';

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <StatusBar style="light" />
      <MainLayout>
        {children}
      </MainLayout>
    </>
  );
};


export const MainLayout = styled.View`
  background: #fafafa;
  flex:1 1 100%;
`

export default Layout;