import React from 'react';
import { View } from 'react-native';
import { Title, Paragraph, Container } from '../theme/Styles';

const Page = () => {
  return (
    <Container>
      <Title>This is the title</Title>
      <Paragraph>
        this is some cool text
        </Paragraph>
    </Container>
  );
};

export default Page;