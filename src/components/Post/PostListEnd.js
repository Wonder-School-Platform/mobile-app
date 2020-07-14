import React from 'react';
import { StyleSheet } from 'react-native';
import { TextContainer, Paragraph } from '../../theme/Styles'

const PostListEnd = (props) => {
  const { text } = props;
  return (
    <TextContainer>
      <Paragraph style={styles.center}>
        {text}
      </Paragraph>
    </TextContainer>
  );
};

const styles = StyleSheet.create({
  center: {
    fontFamily: 'Muli-Bold',
    opacity: 0.3,
    textAlign: 'center',
  }
});

export default PostListEnd;