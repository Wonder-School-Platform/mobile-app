import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Title, Paragraph } from '../theme/Styles';
import InfoItem from '../components/InfoItem';
import { Separator, ContainerWithBorder } from '../theme/Styles';
import SettingsItem from '../components/SettingsItem';
import Theme from '../theme/Theme';

const SchoolInformation = () => {
  const ListSeparator = () => <Separator />
  const data = [
    {
      title: 'Community',
      url: '/',
      id: '1'
    },
    {
      title: 'Staff',
      url: '/',
      id: '2'
    },
    {
      title: 'School Life',
      url: '/',
      id: '3'
    },
  ]
  return (
    <View>
      <Title style={styles.title}>About SCHOOL NAME School</Title>
      <ContainerWithBorder>
        <FlatList
          data={data}
          renderItem={({ item }) => <InfoItem {...item}>{item.title}</InfoItem>}
          ItemSeparatorComponent={ListSeparator}
        />
      </ContainerWithBorder>
      <Title style={styles.title}>Notifications and Feed</Title>
      <View
        style={
          {
            borderColor: `${Theme.colors.border}`,
            borderTopWidth: 1,
          }
        }
      >
        <SettingsItem>
          <Paragraph>
            Turn on Notifications
          </Paragraph>
        </SettingsItem>
      </View>
      <ContainerWithBorder>
        <InfoItem>
          <Paragraph>Preferences</Paragraph>
        </InfoItem>
      </ContainerWithBorder>
    </View >
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 24
  }
})

export default SchoolInformation;