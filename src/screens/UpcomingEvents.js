import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import EventsCalendar from '../components/EventsCalendar';
import styled from 'styled-components';
import Post from '../components/Post/Post';
import { Title } from '../theme/Styles';

const UpcomingEvents = (props) => {
  const { theme } = props;
  const AllEvents = [
    {
      title: 'Book Fair',
      date: 'Monday 13th, 10:00 a.m.',
      location: 'Bristow Elementary',
      category: 'culture',
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
    <View>
      <SafeAreaView>
        <EventsLayout>
          <EventsCalendar theme={theme} />
          <Title style={{ marginBottom: 11 }}>Events on Monday 13</Title>
          <FlatList
            data={AllEvents}
            ListEmptyComponent={() => <PostListSkeleton />}
            renderItem={({ item }) => <Post theme={theme} {...item} />}
            keyExtractor={item => item.key}
          />
        </EventsLayout>
      </SafeAreaView>
    </View>
  );
};

const EventsLayout = styled.View`
  padding: 24px;
`

export default UpcomingEvents;