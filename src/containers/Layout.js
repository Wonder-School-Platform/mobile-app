import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { MainLayout } from '../theme/Styles';

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

export default Layout;