import React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, TextContainer } from '../theme/Styles';

const DataError = ({theme, error}) => {
  console.log(error);
  return (
    <TextContainer style={styles.container}>
      <Paragraph theme={theme} style={styles.errorMessage}>Oh no! There has been an error. Please try again later.</Paragraph>
    </TextContainer>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 22,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default DataError;