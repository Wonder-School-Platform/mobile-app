import React from 'react';
import { View, SafeAreaView } from 'react-native';
import PostList from '../containers/PostList';

const Home = (props) => {
  const { theme } = props;
  return (
    <View>
      <SafeAreaView>
        <PostList theme={theme} />
      </SafeAreaView>
    </View>
  );
};

export default Home;
