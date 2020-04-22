import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, Bar, SkeletonHeader, BarContainer } from '../../theme/Styles';
import { CardContainer } from '../Post/Styles';

const PostSkeleton = (props) => {
  return (
    <CardContainer styles={styles.shadow}>
      <SkeletonHeader opacity={props.opacity} style={{ paddingHorizontal: 10 }}>
        <Circle />
        <BarContainer style={{ height: 48, width: '100%' }}>
          <Bar sizeH='171px' opacity='0.8' />
          <Bar sizeH='96px' sizeV='8px' opacity='0.6' />
        </BarContainer>
      </SkeletonHeader>
      <BarContainer opacity={props.opacity} style={{ paddingHorizontal: 10 }}>
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