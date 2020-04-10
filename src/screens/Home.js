import React from 'react';

import {
  View,
} from 'react-native';

const Home = (props) => {
  return (
    <View>
      {props.children}
    </View>
  );
};

export default Home;
