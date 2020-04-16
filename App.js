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
import Post from './src/components/Post/Post';

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar barStyle="light-content" />
      <Header />
      <ScrollView>
        <MainLayout>
          <Post category='menu' theme={Theme} />
          <Post category='football' />
          <Post category='winter' />
        </MainLayout>
      </ScrollView>
    </ThemeProvider>
  );
};

export default App;
