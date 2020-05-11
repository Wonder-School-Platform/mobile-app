import React from 'react';
import Post from '../components/Post/Post';
import PostListSkeleton from '../containers/PostListSkeleton';
import styled from 'styled-components';

const PostList = (props) => {
  const { theme, data } = props;
  return (
    <ListContainer
      data={data.edges}
      ListEmptyComponent={() => <PostListSkeleton />}
      renderItem={({ item }) => <Post theme={theme} {...item.node} />}
      keyExtractor={item => item.node.databaseId.toString()}
    />
  );
};

const ListContainer = styled.FlatList`
  padding: 20px;
`

export default PostList;