import React from 'react';
import { StyleSheet } from 'react-native';
import { TextContainer, Paragraph } from '../../theme/Styles'

const PostListEnd = (props) => {
  const { children } = props;
  return (
    <TextContainer>
      <Paragraph style={styles.center}>
        {children}
      </Paragraph>
    </TextContainer>
  );
};

const styles = StyleSheet.create({
  center: {
    fontFamily: 'Muli-Bold',
    opacity: 0.5,
    textAlign: 'center',
  }
});

export default PostListEnd;