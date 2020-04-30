import React from 'react';
import Post from '../components/Post/Post';
import PostListSkeleton from '../containers/PostListSkeleton';
import styled from 'styled-components';

const PostList = (props) => {
  const { theme } = props;
  const AllPosts = [
    {
      title: 'This is the post title',
      date: 'Monday 13th, 7:00 p.m.',
      location: 'School Football field',
      excerpt: 'Our menu is now available including pizza, chilli, enchiladas and more.',
      category: 'menu',
      key: '1'
    },
    {
      title: 'This is the post title',
      date: 'Monday 13th, 7:00 p.m.',
      location: 'School Football field',
      excerpt: 'Our menu is now available including pizza, chilli, enchiladas and more.',
      category: 'football',
      featuredImg: 'yes',
      key: '2'
    },
  ]
  return (
    <ListContainer
      data={AllPosts}
      ListEmptyComponent={() => <PostListSkeleton />}
      renderItem={({ item }) => <Post theme={theme} {...item} />}
      keyExtractor={item => item.key}
    />
  );
};

const ListContainer = styled.FlatList`
  padding: 20px;
`

export default PostList;