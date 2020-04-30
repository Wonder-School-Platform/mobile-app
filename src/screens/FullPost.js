import React from 'react';
import {
  View, SafeAreaView, StyleSheet
} from 'react-native';
import { FeaturedImage, MainImg, Icon, PostHeader, PostHeaderContainer, PostDetails, Title, Paragraph, Container } from '../theme/Styles';
import * as Icons from '../components/Icons';

const FullPost = () => {
  return (
    <View>
      <SafeAreaView>
        <FeaturedImage>
          <MainImg source={require('../images/college-football.jpg')} />
        </FeaturedImage>
        <PostHeader style={styles.shadow}>
          <Icon>
            <Icons.Football fill='#ffffff' />
          </Icon>
          <PostHeaderContainer>
            <Title>News Title</Title>
            <PostDetails>Details 1</PostDetails>
            <PostDetails>Details 2</PostDetails>
          </PostHeaderContainer>
        </PostHeader>
        <Container>
          <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet purus gravida quis blandit. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Sapien faucibus et molestie ac feugiat. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Aliquam ultrices sagittis orci a scelerisque. Accumsan lacus vel facilisis volutpat est velit egestas dui. Pretium lectus quam id leo in vitae turpis. </Paragraph>
          <Title>Subtitle</Title>
          <Paragraph>Sit amet purus gravida quis blandit. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Sapien faucibus et molestie ac feugiat. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Aliquam ultrices sagittis orci a scelerisque. Accumsan lacus vel facilisis volutpat est velit egestas dui. Pretium lectus quam id leo in vitae turpis. </Paragraph>
        </Container>
      </SafeAreaView>
    </View>
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

export default FullPost;
