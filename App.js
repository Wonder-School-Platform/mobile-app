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
import WeeklyMenu from './src/screens/WeeklyMenu';

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar barStyle="light-content" />
      <Header title='Section title' school='Custom School Name' />
      <MainLayout>
        {/* <Home theme={Theme} /> */}
        <WeeklyMenu theme={Theme} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
