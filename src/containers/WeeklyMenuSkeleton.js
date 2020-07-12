import React from 'react';
import { StyleSheet } from 'react-native';
import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import { Circle, Bar, SkeletonHeader, BarContainer, FeaturedImage, PostHeader } from '../theme/Styles';
import { StyleSheet } from 'react-native';

const WeeklyMenuSkeleton = (props) => {
  return (
    <>
      <FeaturedImage flexHeight={imageHeightPx}>
        <WeekNavigation />
      </FeaturedImage>
      <PostHeader style={styles.shadow}>
        <SkeletonHeader opacity={props.opacity} style={{ paddingHorizontal: 10, marginBottom: 0 }}>
          <Circle />
          <BarContainer style={{ height: 48, width: '100%' }}>
            <Bar sizeH='171px' opacity='0.8' />
            <Bar sizeH='96px' sizeV='8px' opacity='0.6' />
          </BarContainer>
        </SkeletonHeader>
      </PostHeader>
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
export default WeeklyMenuSkeleton;