import React from 'react';
import { FeaturedImage } from '../components/WeeklyMenu/MenuItem';
import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import { Header } from '../components/WeeklyMenu/Styles';
import { Circle, Bar, SkeletonHeader, BarContainer } from '../theme/Styles';

const WeeklyMenuSkeleton = (props) => {
  return (
    <>
      <FeaturedImage>
        <WeekNavigation />
      </FeaturedImage>
      <Header>
        <SkeletonHeader opacity={props.opacity} style={{ paddingHorizontal: 10, marginBottom: 0 }}>
          <Circle />
          <BarContainer style={{ height: 48, width: '100%' }}>
            <Bar sizeH='171px' opacity='0.8' />
            <Bar sizeH='96px' sizeV='8px' opacity='0.6' />
          </BarContainer>
        </SkeletonHeader>
      </Header>
      <BarContainer style={{ paddingHorizontal: 24, marginBottom: 24 }}>
        <Bar sizeH='95%' opacity='0.2' />
        <Bar sizeH='80%' opacity='0.2' />
        <Bar sizeH='83%' opacity='0.2' />
        <Bar sizeH='80%' opacity='0.2' />
      </BarContainer>
      <BarContainer style={{ paddingHorizontal: 24 }}>
        <Bar sizeH='95%' opacity='0.2' />
        <Bar sizeH='80%' opacity='0.2' />
        <Bar sizeH='83%' opacity='0.2' />
        <Bar sizeH='80%' opacity='0.2' />
      </BarContainer>
    </>
  );
};

export default WeeklyMenuSkeleton;