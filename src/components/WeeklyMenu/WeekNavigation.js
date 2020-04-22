import React from 'react';
import * as Icons from '../Icons';

import { Navigation, WeekDay, Day, Date } from './Styles';

const WeekNavigation = () => {
  return (
    <Navigation>
      <Icons.ArrowLeft fill='#ff0000' />
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
      <Icons.ArrowRight fill='#ff0000' />
    </Navigation>
  );
};

export default WeekNavigation;