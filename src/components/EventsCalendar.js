import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import styled from 'styled-components';
import { Title } from '../theme/Styles';
import { Entypo } from '@expo/vector-icons'; 

import moment from 'moment';

const EventsCalendar = (props) => {
  const { theme, handleDate, events } = props;

  const [eventDates, setEventDates] = useState({});
  let eventDatesArray = {};
  useEffect(() => {
    //Creates an object with event dates to mark in the calendar
    (function handleMarkedDates() {
      events.edges.map(item => {
        const validCategory = item.node.eventCategories.edges[0].node.slug !== 'lunch-menu';
        //const validPostType = item.node.__typename;
        if (validCategory === true) {
          eventDatesArray[moment(item.node.start_date).format('YYYY-MM-DD')] = { marked: true, selected: false }
        }
      })
      setEventDates(eventDatesArray);
    })();
  }, [handleClick]);

  const [viewedDate, setViewedDate] = useState(moment().format('MMM DD, YYYY'));

  const renderArrow = (direction) => {
    if (direction === 'left') {
      return <Entypo name={'chevron-small-left'} size={24} color={theme.colors.primary} />
    } else {
      return <Entypo name={'chevron-small-right'} size={24} color={theme.colors.primary} />
    }
  };

  const handleClick = (day) => {
    const clickedDate = moment(day.dateString).format('YYYY-MM-DD');
    setViewedDate(moment(day.dateString).format('MMM DD, YYYY'));
    const newState = {};

    (function newStateFunction() {
      events.edges.map(item => {
        const itemDate = moment(item.node.start_date).format('YYYY-MM-DD');
        const validCategory = item.node.eventCategories.edges[0].node.slug !== 'lunch-menu';

        if (validCategory === true) {
          if (itemDate !== clickedDate) {
            newState[itemDate] = { marked: true, selected: false }
          } else {
            newState[clickedDate] = { marked: true, selected: true }
          }
        }
      })
    })();

    //validate whether there are events or not that matched the clicked date and select accordingly
    if (!newState[clickedDate]) {
      newState[clickedDate] = { selected: true };
    }

    eventDatesArray = newState;
    setEventDates(eventDatesArray);
  }

  return (
    <>
      <CalendarContainer style={styles.shadow}>
        <Calendar
          onDayPress={(day) => {
            handleDate(day)
            handleClick(day)
          }}
          markedDates={eventDates}
          renderArrow={renderArrow}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#353535',
            selectedDayBackgroundColor: `${theme.colors.primaryLighten}`,
            selectedDayTextColor: `${theme.colors.primary}`,
            todayTextColor: `${theme.colors.primary}`,
            dayTextColor: '#4a4a4a',
            textDisabledColor: '#d9e1e8',
            dotColor: `${theme.colors.primary}`,
            selectedDotColor: `${theme.colors.primary}`,
            arrowColor: `${theme.colors.primary}`,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: `${theme.colors.primary}`,
            indicatorColor: `${theme.colors.primary}`,
            textDayFontFamily: 'Lato-Bold',
            textMonthFontFamily: 'Muli-Bold',
            textDayHeaderFontFamily: 'Lato-Regular',
            textDayFontWeight: 'normal',
            textDayHeaderFontWeight: 'normal',
            textDayFontSize: 14,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 12
          }}
        />
      </CalendarContainer>
      <Title style={styles.title}>{viewedDate}</Title>
    </>
  );
};

const CalendarContainer = styled.View`
  background-color: white;
  border-radius: 10px;
  margin-bottom: 28px;
`
const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 4,
  }
})
export default EventsCalendar;