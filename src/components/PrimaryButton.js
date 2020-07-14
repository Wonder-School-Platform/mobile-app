import React from 'react';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import styled from 'styled-components';
import { scaleText } from 'react-native-text';

const ButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  background-color: ${props => props.color || "#333"};
  border-radius: 28px;
  flex-direction: row;
  align-items: center;
  flex-grow: 0;
  width: 100%;
  margin:10px auto;
`
const ButtonText = styled.Text`
  color: ${props => props.textcolor || "#fff"};
  font-family: 'Muli-Bold';
  line-height:22px;
  margin-right:8px;
`
let color = '';

const PrimaryButton = props => {
  const { text, children, onPress } = props;
  color = props.color;
  return (
    <ButtonContainer onPress={onPress} style={[{backgroundColor: color}, styles.ButtonContainer]}>
      <ButtonText style={ButtonTextStyle}>{text}</ButtonText>
      {children}
    </ButtonContainer>
  );
};

const ButtonTextStyle = scaleText({
  fontSize: 18,
  lineHeight: 18 * 1.1,
});

const styles = StyleSheet.create({
  ButtonContainer:{
    height: Dimensions.get('window').width / 7,
  },
  Logo: {
    width: 0,
  },
  tipText: {
    color: '#4a4a4a',
    lineHeight: 20 * 1.2,
    marginBottom: 0,
  },

});

export default PrimaryButton;