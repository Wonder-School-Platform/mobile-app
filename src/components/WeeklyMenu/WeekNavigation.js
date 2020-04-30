import React from 'react';
import * as Icons from '../Icons';
import { Navigation, WeekDay, Day, Date } from './Styles';
import Theme from '../../theme/Theme';

const WeekNavigation = () => {
  return (
    <Navigation style={styles.shadow}>
      <Icons.ArrowLeft fill={Theme.colors.primary} />
      <WeekDay>
        <Day>Mon</Day>
        <Date>13</Date>
      </WeekDay>
      <WeekDay active={true}>
        <Day>Tue</Day>
        <Date active={true}>14</Date>
      </WeekDay>
      <WeekDay>
        <Day>Mie</Day>
        <Date>15</Date>
      </WeekDay>
      <WeekDay>
        <Day>Jue</Day>
        <Date>16</Date>
      </WeekDay>
      <WeekDay>
        <Day>Vie</Day>
        <Date>17</Date>
      </WeekDay>
      <Icons.ArrowRight fill={Theme.colors.primary} />
    </Navigation>
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
  }
})
export default WeekNavigation;