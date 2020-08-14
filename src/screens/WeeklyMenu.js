import React from 'react';
import {Text} from 'react-native';

import TheMenu from '../containers/Menu';

const WeeklyMenu = ({data, theme}) => {
  let dataSchools = [];
  
  function schoolsOfDistrict() {
    data & data.districtSchools.edges.map(district => {
      return district.node.children.edges.map(school => {
        console.log(school.node.menuPlans)
        dataSchools.push({
          value: school.node.slug,
          label: school.node.name
        })
      });
  })[0]};
  schoolsOfDistrict()
  return (
      <TheMenu data={data} theme={theme} />
    );
  };

export default WeeklyMenu;