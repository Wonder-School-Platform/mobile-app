import React from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components';
import * as Icons from '../components/Icons';
import PrimaryButton from '../components/PrimaryButton';
import { Bold, Paragraph } from '../theme/Styles';
import Theme from '../theme/Theme';

const Onboarding = () => {
  return (
    <OnboardingLayout>
      <Logo>
        <Image source={require('../images/ogs_logo.png')} />
      </Logo>
      <TipsContainer>
        <Tip>
          <IconLayer3>
            <IconLayer2>
              <IconLayer1>
                <Icons.Home fill={Theme.colors.primary} />
              </IconLayer1>
            </IconLayer2>
          </IconLayer3>
          <Paragraph style={styles.tipText}>
            <Bold style={styles.tipText}>Never miss a thing!</Bold> Get your school's daily news and updates.
        </Paragraph>
        </Tip>
        <Tip>
          <IconLayer3>
            <IconLayer2>
              <IconLayer1>
                <Icons.Menu fill={Theme.colors.primary} />
              </IconLayer1>
            </IconLayer2>
          </IconLayer3>
          <Paragraph style={styles.tipText}>
            <Bold style={styles.tipText}>Plan ahead</Bold> and discover the daily menus serving in your school.
        </Paragraph>
        </Tip>
        <Tip>
          <IconLayer3>
            <IconLayer2>
              <IconLayer1>
                <Icons.Menu fill={Theme.colors.primary} />
              </IconLayer1>
            </IconLayer2>
          </IconLayer3>
          <Paragraph style={styles.tipText}>
            <Bold style={styles.tipText}>Stay on track,</Bold> get a schedule for all social and academic events.
        </Paragraph>
        </Tip>
      </TipsContainer>
      <PrimaryButton text='Continue'>
        <Icons.ArrowRight fill={Theme.colors.overPrimary} />
      </PrimaryButton>
    </OnboardingLayout>
  );
};

const OnboardingLayout = styled.View`
  justify-content: space-evenly;
  flex:0 0 100%;
`
const Logo = styled.View`
  flex: 0 0 110px;
  justify-content: center;
  align-items: center;
  margin:20px 0;
`
const IconLayer1 = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryLighten};
  border-radius: 60px;
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
`
const IconLayer2 = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryLighten};
  border-radius: 60px;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  opacity:0.8;
`
const IconLayer3 = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryLighten};
  border-radius: 60px;
  height: 70px;
  width: 70px;
  justify-content: center;
  align-items: center;
  opacity:0.8;
  margin-right: 14px;
`
const TipsContainer = styled.View`
  flex:0 0 auto;
`
const Tip = styled.View`
  flex-direction: row;
  padding: 0 32px;
  margin: 20px 0;
  width:100%;
  align-items: center;
`

const styles = StyleSheet.create({
  tipText: {
    color: '#4a4a4a',
    lineHeight: 24,
    marginBottom: 0
  }
})

export default Onboarding;