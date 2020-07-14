import React, {useState, useEffect} from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import AsyncStorage from '@react-native-community/async-storage';

import PostListSkeleton from '../containers/PostListSkeleton';
import DataError from '../components/DataError';
import SettingsItem from '../components/SettingsItem';
import { TextContainer, Paragraph, Separator, Title } from '../theme/Styles';

const APP_SETTINGS = gql`
  {
    appSettings {
      website_pages {
        pages {
          ... on Page {
            id
            title
            databaseId
          }
        }
      }
      school_settings {
        schoolName
      }
    }
  }
`

const STORAGE_KEY = '@save_notifications';

const More = ({theme}) => {
  //Handle notifications
  const [notifications, setNotifications] = useState(false);

  useEffect(() => {
    readData()
  }, []);

  const readData = async () => {
    try {
      const showNotifications = await AsyncStorage.getItem(STORAGE_KEY);

      if (showNotifications !== null) {
        setNotifications(JSON.parse(showNotifications));
      }

    } catch (error) {
      console.log(error)
    }
  }

  const saveData = async (notifications) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.log(error);
    }
  }
  
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error)
    }
  }

  //clearStorage() //helper function to clear ALL storage, not of real use in PROD
  
  const handleNotifications = (notificationsState) => {
    setNotifications(previousState => !previousState);
    saveData(notificationsState);
  }

  //Navigation props
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(APP_SETTINGS);
  const ListSeparator = () => <Separator />
  if (loading) return <PostListSkeleton />
  if (error) return <DataError />

  const handlePress = (databaseId) => navigation.navigate('Full Page', { id: databaseId });

  const handlePreferences = (pageName, theme) => navigation.navigate(pageName, theme);

  const pages = data.appSettings.website_pages.pages;
  const school = data.appSettings.school_settings;

  return (
    <SettingsLayout>
      <TextContainer>
        <Title>About {school.schoolName}</Title>
      </TextContainer>
      <ListContainer>
        <FlatList
          data={pages}
          renderItem={({ item }) => <SettingsItem 
            type='page'
            handlePress={handlePress}
            theme={theme}
            {...item}>
            {item.title}
          </SettingsItem>}
          ItemSeparatorComponent={ListSeparator}
        />
      </ListContainer>
      <TextContainer>
        <Title>Notifications and feed</Title>
      </TextContainer>
      <ListContainer>
        <SettingsItem
          type='settings'
          settingsName='notifications'
          handleSettings={handleNotifications}
          theme={theme}
          active={notifications}
        >
          Turn on notifications
        </SettingsItem>
        <Separator />
        <SettingsItem
          type='preferences'
          pageName={'Preferences'}
          handlePreferences={handlePreferences}
          theme={theme}
        >
          Preferences
        </SettingsItem>
      </ListContainer>
    </SettingsLayout >
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
const border = styled.View`
  border-color: ${({ theme }) => theme.colors.border};
  border-top-width: 1px;
`
export default More;