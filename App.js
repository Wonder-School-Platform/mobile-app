import React from 'react';
import {
  StatusBar,
  Text,
  View
} from 'react-native';
import { ThemeProvider } from 'styled-components';

import Theme from './src/theme/Theme';
import Header from './src/components/Header';
import { MainLayout } from './src/theme/Styles'
import PostSkeleton from './src/components/PostSkeleton'

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <MainLayout>
        <PostSkeleton />
        <PostSkeleton opacity='0.75' />
        <PostSkeleton opacity='0.5' />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
