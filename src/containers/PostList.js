import React from 'react';
import { StyleSheet } from 'react-native';
import Post from '../components/Post/Post';
import PostListSkeleton from '../containers/PostListSkeleton';
import styled from 'styled-components';

const PostList = (props) => {
  const { theme, data, fetchMore } = props;

  const loadMoreData = () => {
    fetchMore({
      variables: { cursor: data.pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.posts.edges;
        const pageInfo = fetchMoreResult.posts.pageInfo;
        return newEdges.length
          ? {
            posts: {
              __typename: previousResult.posts.__typename,
              edges: [...previousResult.posts.edges, ...newEdges],
              pageInfo
            }
          } : previousResult;
      }
    })
  }

  return (
    <PostListContainer>
      <List
        data={data.edges}
        keyExtractor={item => item.node.databaseId.toString()}
        ListEmptyComponent={() => <PostListSkeleton />}
        renderItem={({ item }) => <Post theme={theme} {...item.node} />}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
      />
    </PostListContainer>
  );
};

const List = styled.FlatList`
  padding: 20px;
`
const PostListContainer = styled.View`
  flex: 1;
  border: 1px solid red;
`
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 48
  }
});

export default PostList;