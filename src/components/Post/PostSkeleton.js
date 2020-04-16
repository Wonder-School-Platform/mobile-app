import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CardContainer, Circle, Bar, SkeletonHeader, BarContainer } from './Styles';

const PostSkeleton = (props) => {
  return (
    <CardContainer styles={styles.shadow}>
      <SkeletonHeader opacity={props.opacity}>
        <Circle />
        <BarContainer>
          <Bar sizeH='171px' opacity='0.8' />
          <Bar sizeH='96px' sizeV='8px' opacity='0.6' />
        </BarContainer>
      </SkeletonHeader>
      <BarContainer opacity={props.opacity}>
        <Bar opacity='0.6' />
        <Bar sizeH='80%' opacity='0.5' />
        <Bar sizeH='88%' opacity='0.4' />
        <Bar sizeH='80%' opacity='0.3' />
      </BarContainer>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  }
})

export default PostSkeleton;