import React from 'react';
import { View, Text, Switch, FlatList, SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components';
import SettingsItem from '../components/SettingsItem';
import PrimaryButton from '../components/PrimaryButton';
import { TextContainer, Paragraph, Separator } from '../theme/Styles';
import Theme from '../theme/Theme';
import { Entypo } from '@expo/vector-icons';
import ScalableText from 'react-native-text';
import { scaleText } from 'react-native-text';

const Settings = () => {
  const SettingsData = [
    {
      setting: 'Early Childhood',
      selected: false,
      id: '1'
    },
    {
      setting: 'Elementary School',
      selected: false,
      id: '2'
    },
    {
      setting: 'Middle School',
      selected: true,
      id: '3'
    },
    {
      setting: 'High School',
      selected: true,
      id: '4'
    },
  ];
  const ListSeparator = () => <Separator />
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <SettingsLayout>
          <TextContainer>
            <ScalableText style={styleParagraph}>
              Please select the school levels you want to receive information from, you can adjust it later in the app settings .
            </ScalableText>
          </TextContainer>
          <ListContainer>
            <FlatList
              data={SettingsData}
              renderItem={({ item }) => <SettingsItem {...item}>{item.setting}</SettingsItem>}
              ItemSeparatorComponent={ListSeparator}
            />
          </ListContainer>
          <ButtonContainer>
            <PrimaryButton
              text='Get Started'
            >
            <Entypo name={'chevron-small-right'} size={24} color={theme.colors.overPrimary} />
            </PrimaryButton>
          </ButtonContainer>
        </SettingsLayout >
      </ScrollView>
    </SafeAreaView>
  );
};

const SettingsLayout = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex:1 1 100%;
`
const ListContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-top-width: 1px;
`
const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 24px;
`
const styleParagraph = scaleText({
  fontSize: 18,
  lineHeight: 18 * 1.2,
  fontWeight: 600,
});
export default Settings;