import React from 'react';

import TheMenu from '../containers/Menu';

const WeeklyMenu = ({data, theme}) => {
  return (
    <TheMenu data={data} theme={theme} />
  );
};

export default WeeklyMenu;