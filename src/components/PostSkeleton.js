import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components';

const CardContainer = styled.View`
  background: white;
  border-radius: 10px;
  padding: 16px 21px 24px 15px;
  justify-content:flex-start;
  flex: 0 0 auto;
  flex-direction: column;
  overflow: hidden;
  elevation: 2;
  margin-bottom: 16px;
`

const Circle = styled.View`
  background: #d8d8d8;
  border-radius:24px;
  height:48px;
  margin-right:12px;
  width:48px;
`
const Bar = styled.View`
  background: #d8d8d8;
  border-radius: 5px;
  max-height: ${props => (props.sizeV ? props.sizeV : '13px')};
  opacity: ${props => (props.opacity ? props.opacity : '1')};
  flex:0 1 13px;
  max-width:${props => (props.sizeH ? props.sizeH : '100%')};
  margin:6px;
`
const Header = styled.View`
  /* border:1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 48px;
  margin-bottom:24px;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`
const BarContainer = styled.View`
  /* border:1px solid green; */
  flex:0 0 100px;
  justify-content: center;
  flex-direction: column;
  opacity: ${props => (props.opacity ? props.opacity : '1')};
`

const PostSkeleton = (props) => {
  return (
    <CardContainer styles={styles.shadow}>
      <Header opacity={props.opacity}>
        <Circle />
        <BarContainer>
          <Bar sizeH='171px' opacity='0.8' />
          <Bar sizeH='96px' sizeV='8px' opacity='0.6' />
        </BarContainer>
      </Header>
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