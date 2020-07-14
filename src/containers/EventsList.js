import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import EventPost from '../components/Post/EventPost';
import PostListEnd from '../components/Post/PostListEnd';
import PostListSkeleton from '../containers/PostListSkeleton';
import styled from 'styled-components';

import moment from 'moment';
import EventsCalendar from '../components/EventsCalendar';

const PostList = (props) => {
  const { theme, data, fetchMore, venuesList, organizersList, selectedDate, handleDate } = props;

  const [events, setEvents] = useState();

  useEffect(() => {
    setEvents(data.edges)
  }, []);

  const loadMoreData = () => {
    fetchMore({
      variables: { cursor: data.pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.events.edges;
        const pageInfo = fetchMoreResult.events.pageInfo;
        return newEdges.length
          ? {
            posts: {
              __typename: previousResult.events.__typename,
              edges: [...previousResult.events.edges, ...newEdges],
              pageInfo
            },
            events: {
              __typename: previousResult.events.__typename,
              edges: [...previousResult.events.edges],
              pageInfo
            },
            eventVenues: {
              __typename: previousResult.eventVenues.__typename,
              edges: [...previousResult.eventVenues.edges]
            },
            eventOrganizers: {
              __typename: previousResult.eventOrganizers.__typename,
              edges: [...previousResult.eventOrganizers.edges]
            }
          } : previousResult;
      }
    })
  }

  renderItem = ({ item }) => {
    //This function checks if the selected date marked events by
    //comparing the selected date with each one of the event posts.
    //If selected date matches post date, it returns the event post,
    //else, if the selected date is null, ir returns all the event posts,
    //if the selected date doesn't match the event post, turns the "show" flag to false
    const postDate = moment(item.node.start_date).toObject();
    postDate.months = postDate.months + 1;
    const filteredDate = `${postDate.months} ${postDate.date} ${postDate.years}`;
    return (
      <EventPost
        theme={theme} {...item.node}
        venuesList={venuesList}
        organizersList={organizersList}
        selectedDate={selectedDate}
        show={selectedDate === filteredDate || selectedDate === null ? true : false}
      />
    )
  }

  handleFooter = (footerText) => {
    return (
      <PostListEnd text={'There are no more events to show'} />
    )
  }

  return (
    <PostListContainer>    
      <List
        ListHeaderComponent={() => (
          <>
            <EventsCalendar
              theme={theme}
              events={data}
              handleDate={handleDate}
            />
          </>
        )}
        data={events}
        keyExtractor={item => item.node.eventId.toString()}
        ListEmptyComponent={() => <PostListSkeleton />}
        renderItem={renderItem}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={handleFooter}
      />
    </PostListContainer>
  );
};

const List = styled.FlatList`
  padding: 20px 24px;
`
const PostListContainer = styled.View`
  flex: 1;
`
const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24
  },
  center: {
    fontFamily: 'Muli-Bold',
    opacity: 0.3,
    textAlign: 'center',
  }
});

export default PostList;