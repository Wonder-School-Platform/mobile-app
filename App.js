import React from 'react';
import {
  StatusBar,
  ScrollView,
  Text,
  View
} from 'react-native';
import { ThemeProvider } from 'styled-components';

import Theme from './src/theme/Theme';
import Header from './src/components/Header';
import { MainLayout } from './src/theme/Styles';
/* import Home from './src/screens/Home'; */
/* import PostListSkeleton from './src/containers/PostListSkeleton'; */
/* import FullPost from './src/screens/FullPost'; */
/* import WeeklyMenu from './src/screens/WeeklyMenu'; */
/* import WeeklyMenuSkeleton from './src/containers/WeeklyMenuSkeleton'; */

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar barStyle="light-content" />
      <Header
        title='Section title'
        school='Custom School Name'
        currentScreen='Generic' />
      <MainLayout>
        {/* <Home theme={Theme} /> */}
        {/* <FullPost theme={Theme} /> */}
        {/* <WeeklyMenu /> */}
        {/* <PostListSkeleton /> */}
        {/* <WeeklyMenuSkeleton /> */}
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
