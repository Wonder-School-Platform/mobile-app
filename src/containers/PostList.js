import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Post from '../components/Post/Post';
import EventPost from '../components/Post/EventPost';
import PostListEnd from '../components/Post/PostListEnd';
import PostListSkeleton from '../containers/PostListSkeleton';
import styled from 'styled-components';

const PostList = (props) => {
  const {
    theme,
    data,
    fetchMore,
    venuesList,
    organizersList,
    preferences } = props;

  const loadMoreData = () => {
    fetchMore({
      variables: { cursor: data.pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.contentNodes.edges;
        const pageInfo = fetchMoreResult.contentNodes.pageInfo;
        return newEdges.length
          ? {
            contentNodes: {
              __typename: previousResult.contentNodes.__typename,
              edges: [...previousResult.contentNodes.edges, ...newEdges],
              pageInfo
            },
            eventVenues: {
              __typename: previousResult.eventVenues.__typename,
              edges: [...previousResult.eventVenues.edges]
            },
            eventOrganizers: {
              __typename: previousResult.eventOrganizers.__typename,
              edges: [...previousResult.eventOrganizers.edges]
            },
            districtSchools: {
              __typename: previousResult.districtSchools.__typename,
              edges: [...previousResult.districtSchools.edges]
            }
          } : previousResult;
      }
    })
  }

  return (
    <PostListContainer>
      <List
        data={data.edges}
        keyExtractor={(item) => {
          if (item.node.databaseId) {
            return item.node.databaseId.toString()
          } else {
            return item.node.id;
          }
        }}
        ListEmptyComponent={() => <PostListSkeleton />}
        renderItem={({ item }) => {
          const typename = item.node.__typename;

          let school;

          if(preferences.length > 0){
            school =
            item.node.districtSchools &&
            item.node.districtSchools.edges &&
            item.node.districtSchools.edges.length &&
            item.node.districtSchools.edges[0].node.slug;
          } else {
            school = 1;
          }

          switch (typename) {
            case 'Post':
              return <Post
                theme={theme}
                preferences={preferences}
                school={school}
                {...item.node}
              />
              break;
            case 'Event':
              return <EventPost
                theme={theme}
                venuesList={venuesList}
                organizersList={organizersList}
                school={school}
                show={item.node.start_date !== null ? true : false}
                preferences={preferences}
                {...item.node}
              />
              break;
            default:
              return null;
              break;
          }
        }}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => <PostListEnd>You are up to date!</PostListEnd>}
      />
    </PostListContainer>
  );
};

const List = styled.FlatList`
  padding: 20px;
`
const PostListContainer = styled.View`
  flex: 1;
`
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24
  }
});

export default PostList;