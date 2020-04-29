import React from 'react';
import * as Icons from '../Icons';
import { Navigation, WeekDay, Day, Date } from './Styles';
import Theme from '../../theme/Theme';

const WeekNavigation = () => {
  return (
    <Navigation>
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

export default WeekNavigation;