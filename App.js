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
/* import Splash from './src/screens/Splash'; */
/* import Onboarding from './src/screens/Onboarding'; */
/* import Settings from './src/screens/Settings'; */
/* import UpcomingEvents from './src/screens/UpcomingEvents'; */
import SchoolInformation from './src/screens/SchoolInformation';

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar barStyle="light-content" />
      <Header
        title='Section title'
        school='Custom School Name'
        currentScreen='generic' />
      <MainLayout>
        {/* <Home theme={Theme} /> */}
        {/* <FullPost theme={Theme} /> */}
        {/* <WeeklyMenu /> */}
        {/* <PostListSkeleton /> */}
        {/* <WeeklyMenuSkeleton /> */}
        {/* <Splash /> */}
        {/* <Onboarding /> */}
        {/* <Settings /> */}
        {/* <UpcomingEvents theme={Theme} /> */}
        <SchoolInformation />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
