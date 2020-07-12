import React, {useEffect, useState} from 'react';
import { View, 
  Image, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { scaleText } from 'react-native-text';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';

import PrimaryButton from '../components/PrimaryButton';
import { Bold, Paragraph } from '../theme/Styles';
import { Ionicons, Entypo} from '@expo/vector-icons';

const iconCircleHeight =  Dimensions.get('window').width / 6;
const fontSize =  Math.round(iconCircleHeight / 3.2);
const lineHeight =  Math.round(fontSize * 1.3);

//onboarding_key
const ONBOARDING_KEY = '@save_onboarding';

const Onboarding = props => {
  const {logo, navigation, theme} = props;

  const saveDataOnboarding = async (onboarding) => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, JSON.stringify(onboarding));
    } catch (error) {
      console.log(error);
    }
  }

  function hexToRgb(hex, opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', '+opacity+')';
    }
    throw new Error('Bad Hex');
  }

  //Navigation props
  const handleOnboarding = () => {
    saveDataOnboarding(true);
    navigation.navigate('Home');
  }
  
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000
    }).start();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor:'#fafafa'}}>
      <View style={styles.OnboardingLayout }>
        <Animatable.View style={styles.Logo} animation="fadeIn" iterationCount={1} direction="alternate" duration={1500}>
            <Image
              source={{ 
                uri: `${logo}`,
                height: 200,
                width: 200
              }}
              resizeMode='contain'
            />
        </Animatable.View>
        <TipsContainer> 
          <Animatable.View animation="slideInRight" iterationCount={1} delay={0} easing="linear">
          <Tip>
            <IconLayer3 iconHeight={iconCircleHeight+"px"} color={hexToRgb(theme.colors.primary, 0.1)}>
              <IconLayer2 iconHeight={(iconCircleHeight - 10)+"px"} color={hexToRgb(theme.colors.primary, 0.2)}>
                <IconLayer1 iconHeight={(iconCircleHeight - 20)+"px"} color={hexToRgb(theme.colors.primary, 0.3)}>
                  <Ionicons name={'md-home'} size={iconCircleHeight/2.5} color={theme.colors.primary} />
                </IconLayer1>
              </IconLayer2>
            </IconLayer3>
            <Paragraph fontSize={fontSize+"px"} lineHeight={lineHeight+"px"}>
                <Bold fontSize={fontSize+"px"} 
                      lineHeight={lineHeight+"px"} 
                      style={styles.tipText}>
                Never miss a thing!
                </Bold>Get your school's daily news and updates.
            </Paragraph>
          </Tip>
          </Animatable.View>
          <Animatable.View animation="slideInRight" iterationCount={1} delay={500}>
          <Tip>
            <IconLayer3 iconHeight={iconCircleHeight+"px"} color={hexToRgb(theme.colors.primary, 0.1)}>
              <IconLayer2 iconHeight={(iconCircleHeight - 10)+"px"} color={hexToRgb(theme.colors.primary, 0.2)}>
                <IconLayer1 iconHeight={(iconCircleHeight - 20)+"px"} color={hexToRgb(theme.colors.primary, 0.3)}>
                  <Ionicons name={'md-restaurant'} size={iconCircleHeight/2.5} color={theme.colors.primary} />
                </IconLayer1>
              </IconLayer2>
            </IconLayer3>
            <Paragraph fontSize={fontSize+"px"} lineHeight={lineHeight+"px"}>
                <Bold fontSize={fontSize+"px"} 
                      lineHeight={lineHeight+"px"} 
                      style={styles.tipText}>
                Plan ahead
                </Bold> and discover the daily menus serving in your school.
            </Paragraph>
          </Tip>
          </Animatable.View>
          <Animatable.View animation="slideInRight" iterationCount={1} delay={1500}>
          <Tip>
            <IconLayer3 iconHeight={iconCircleHeight+"px"} color={hexToRgb(theme.colors.primary, 0.1)}>
              <IconLayer2 iconHeight={(iconCircleHeight - 10)+"px"} color={hexToRgb(theme.colors.primary, 0.2)}>
                <IconLayer1 iconHeight={(iconCircleHeight - 20)+"px"} color={hexToRgb(theme.colors.primary, 0.3)}>
                  <Ionicons name={'md-calendar'} size={iconCircleHeight/2.5} color={theme.colors.primary} />
                </IconLayer1>
              </IconLayer2>
            </IconLayer3>
            <Paragraph fontSize={fontSize+"px"} lineHeight={lineHeight+"px"}>
                <Bold fontSize={fontSize+"px"} 
                      lineHeight={lineHeight+"px"} 
                      style={styles.tipText}>
                Stay on track,
                </Bold> get a schedule for all social and academic events.
            </Paragraph>
          </Tip>
          </Animatable.View>
        </TipsContainer>
        <Animatable.View animation="slideInUp" iterationCount={1} delay={2000}>
          <PrimaryButton text='Continue' onPress={handleOnboarding} color={theme.colors.primary}>
            <Entypo name={'chevron-small-right'} size={24} color={'white'} />
          </PrimaryButton>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const IconLayer1 = styled.View`
  background-color: ${props => props.color || "rgba(0,0,0,0.3)"};
  border-radius: 60px;
  height: ${props => props.iconHeight || "50px"};
  width: ${props => props.iconHeight || "50px"};
  justify-content: center;
  align-items: center;
  opacity: 1;
`
const IconLayer2 = styled.View`
  background-color: ${props => props.color || "rgba(0,0,0,0.1)"};
  border-radius: 60px;
  height: ${props => props.iconHeight || "70px"};
  width: ${props => props.iconHeight || "70px"};
  justify-content: center;
  align-items: center;
`
const IconLayer3 = styled.View`
  background-color: ${props => props.color || "rgba(0,0,0,0.1)"};
  border-radius: 60px;
  height: ${props => props.iconHeight || "90px"};
  width: ${props => props.iconHeight || "90px"};
  justify-content: center;
  align-items: center;
  margin-right: 14px;
`
const TipsContainer = styled.View`
  flex:0 0 auto;
  margin: 20px 0;
`
const Tip = styled.View`
  flex-direction: row;
  padding: 0;
  margin: 10px 0;
  width:100%;
  align-items: center;
`

const styles = StyleSheet.create({
  OnboardingLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 30,
  },
  Logo: {
    width: '100%',
    flex: 0,
    justifyContent:'center',
    flexDirection: 'row',
  },
  LogoImg: {
    width: Dimensions.get('window').width / 2.2,
    resizeMode: 'contain',
    padding: 0
  },
  tipText: {
    color: '#4a4a4a',
    lineHeight: 20 * 1.2,
    marginBottom: 0,
  }
});

const styleParagraph = scaleText({
  fontSize: 16,
  lineHeight: 16 * 1.1,
});

export default Onboarding;