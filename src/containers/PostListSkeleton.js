import React from 'react';
import { View } from 'react-native';
import PostSkeleton from '../components/Post/PostSkeleton';

const PostListSkeleton = () => {
  return (
    <View style={{ padding: 24 }}>
      <PostSkeleton opacity={1} />
      <PostSkeleton opacity={0.75} />
      <PostSkeleton opacity={0.5} />
    </View>
  );
};

export default PostListSkeleton;