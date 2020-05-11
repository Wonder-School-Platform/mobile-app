import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';

import client from './src/apollo/client';
import Theme from './src/theme/Theme';
import Header from './src/components/Header';
import { MainLayout } from './src/theme/Styles';
import MainMenu from './src/components/MainMenu';
import Home from './src/screens/Home';
/* import PostListSkeleton from './src/containers/PostListSkeleton'; */
/* import FullPost from './src/screens/FullPost'; */
/* import WeeklyMenu from './src/screens/WeeklyMenu'; */
/* import WeeklyMenuSkeleton from './src/containers/WeeklyMenuSkeleton'; */
/* import Splash from './src/screens/Splash'; */
/* import Onboarding from './src/screens/Onboarding'; */
/* import Settings from './src/screens/Settings'; */
/* import UpcomingEvents from './src/screens/UpcomingEvents'; */
/* import SchoolInformation from './src/screens/SchoolInformation'; */
/* import Page from './src/screens/Page'; */
/* import PostsSearch from './src/components/Post/PostsSearch'; */

const App: () => React$Node = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={Theme}>
        <StatusBar barStyle="light-content" />
        <Header
          title='Section title'
          school='Custom School Name'
          currentScreen='generic' />
        <MainLayout>
          <Home theme={Theme} />
          {/* <FullPost theme={Theme} /> */}
          {/* <WeeklyMenu /> */}
          {/* <PostListSkeleton /> */}
          {/* <WeeklyMenuSkeleton /> */}
          {/* <Splash /> */}
          {/* <Onboarding /> */}
          {/* <Settings /> */}
          {/* <UpcomingEvents theme={Theme} /> */}
          {/* <SchoolInformation /> */}
          {/* <Page /> */}
          {/* <PostsSearch /> */}
        </MainLayout>
        {/* <MainMenu /> */}
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
