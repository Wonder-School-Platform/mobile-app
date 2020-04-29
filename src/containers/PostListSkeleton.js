import React from 'react';
import { View, StyleSheet } from 'react-native';
import PostSkeleton from '../components/Post/PostSkeleton';

const PostListSkeleton = () => {
  return (
    <View style={styles.container}>
      <PostSkeleton opacity={1} />
      <PostSkeleton opacity={0.75} />
      <PostSkeleton opacity={0.5} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  }
})

export default PostListSkeleton;