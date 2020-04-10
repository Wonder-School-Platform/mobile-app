import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { ThemeProvider } from 'styled-components';

import Theme from './src/theme/Theme';
import Header from './src/components/Header';

const App: () => React$Node = () => {
  return (
    <ThemeProvider theme={Theme}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <View>
        <Text>esto</Text>
      </View>
    </ThemeProvider>
  );
};

export default App;
