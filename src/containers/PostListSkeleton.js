import React from 'react';
import PostSkeleton from '../components/Post/PostSkeleton';

const PostListSkeleton = () => {
  return (
    <>
      <PostSkeleton opacity={1} />
      <PostSkeleton opacity={0.75} />
      <PostSkeleton opacity={0.5} />
    </>
  );
};

export default PostListSkeleton;