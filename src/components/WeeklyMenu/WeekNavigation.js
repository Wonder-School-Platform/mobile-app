import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, SafeAreaView, Dimensions } from 'react-native';
import moment from 'moment';
import { Navigation, WeekDay, Day, Date } from './Styles';
import Theme from '../../theme/Theme';
import { Entypo } from '@expo/vector-icons'; 
import ScalableText from 'react-native-text';

const WeekDayWidth = (Dimensions.get('window').width / 7) - 10;
const WeekDayWidthPx = WeekDayWidth + 'px';

const WeekNavigation = ({ weekDates, calendarDate, handleDateToShow, handleIsWeek }) => {

  const week = Object.entries(weekDates).map((key) => {
    const day = key[0];
    const date = key[1];

    return (
      <TouchableWithoutFeedback
        key={key[0]}
        dataDay={key[0]}
        onPress={() => {
          handleDateToShow(key[0], key[1])
        }}
        style={{ borderWidth: 1, background: 'red' }}
      >
        <WeekDay active={calendarDate} width={WeekDayWidthPx} height={WeekDayWidthPx}>
          <ScalableText styles={styles.day}>{day}</ScalableText>
          <Date active={calendarDate}><ScalableText style={styles.date}>{date}</ScalableText></Date>
          
        </WeekDay>
      </TouchableWithoutFeedback>
    )
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation style={styles.shadow}>
        <TouchableWithoutFeedback
          onPress={() => handleIsWeek('left')}
        >
        <Entypo name="chevron-small-left" size={24} color={Theme.colors.primary} />
        </TouchableWithoutFeedback>
        {week}
        <TouchableWithoutFeedback
          onPress={() => handleIsWeek('right')}
        >
        <Entypo name="chevron-small-right" size={24} color={Theme.colors.primary} />
        </TouchableWithoutFeedback>
      </Navigation>
    </SafeAreaView>
  );
};
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
  }, 
  day: {
    fontSize: 12,
  },
  date: {
    fontSize: 14,
  }
})

export default WeekNavigation;