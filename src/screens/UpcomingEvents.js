import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';

import EventsList from '../containers/EventsList';
import PostListSkeleton from '../containers/PostListSkeleton';
import DataError from '../components/DataError';
import NoEvents from '../components/NoEvents';

const ALL_EVENTS_QUERY = gql`
  query ALL_EVENTS_QUERY($cursor: String) {
    eventVenues {
      edges {
        node {
          title
          databaseId
        }
      }
    }
    eventOrganizers {
      edges {
        node {
          title
          databaseId
        }
      }
    }
    events(first: 12, where: {status: PUBLISH}, after: $cursor) {
      edges {
        node {
          eventId
          title
          start_date
          end_date
          all_day
          eventCategories {
            edges {
              node {
                name
                slug
                categoryIcon {
                  categoryIcon {
                    sourceUrl
                  }
                }
              }
            }
          }
          excerpt
          cost
          venue
          organizer
          featuredImage {
            id
            sourceUrl
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

const UpcomingEvents = (props) => {
  const { theme } = props;
  const [date, setDate] = useState(null);

  const handleDate = date => {
    //This function handles the click in the calendar grid component to select the date.
    //The display logic is handled in the Events List component.
    const selectedDate = moment(date.dateString).toObject();
    selectedDate.months = selectedDate.months + 1;
    const dateToShow = `${selectedDate.months} ${selectedDate.date} ${selectedDate.years}`;
    setDate(dateToShow)
  }

  return (
    <Query query={ALL_EVENTS_QUERY}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <PostListSkeleton />;
        if (error) return <DataError />;
        if (!data.events.edges.length) return <NoEvents>There are no upcoming events to show at the moment.</NoEvents>;
        return (
          <EventsList
            data={data.events}
            venuesList={data.eventVenues}
            organizersList={data.eventOrganizers}
            theme={theme}
            fetchMore={fetchMore}
            selectedDate={date}
            handleDate={handleDate}
          />
        );
      }}
    </Query >
  );
};

export default UpcomingEvents;
