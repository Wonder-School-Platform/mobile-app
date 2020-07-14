import React, { useState, useEffect } from 'react';
import {View, Text, FlatList} from 'react-native';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';

import DataError from '../components/DataError';
import SettingsItem from '../components/SettingsItem';

import { Paragraph, Separator, TextContainer, Title } from '../theme/Styles';

const DISTRICT_SCHOOLS = gql`
    query DistrictSchools {
        districtSchools {
            edges {
                node {
                    name
                    slug
                    databaseId
                }
            }
        }
    }
`

const STORAGE_KEYS = '@save_preferences';

const Preferences = ({theme}) => {
    //Handle Preferences
    const [preferences, setPreferences] = useState({});

    useEffect(() => {
        readData()
    }, []);
    
    //The callback function to save the data after the state is updated
    useEffect(() => {
        saveData(preferences)
    }, [preferences]);

    const readData = async () => {
        try {
            const readPreferences = await AsyncStorage.getItem(STORAGE_KEYS);

            if (readPreferences !== null) {
                setPreferences(JSON.parse(readPreferences));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS, JSON.stringify(preferences));
        } catch (error) {
            console.log(error);
        }
    }

    const clearStorage = async () => {
        try {
          await AsyncStorage.clear();
        } catch (error) {
          console.log(error);
        }
      }
    
    //clearStorage() //helper function to clear ALL storage, not of real use in PROD    

    const handleFilter = async (settingsName, isActive) => {
        const key_name = await settingsName.replace(/-/g, '_');
        setPreferences({...preferences, [key_name]: isActive});
    }
    
    const {loading, error, data} = useQuery(DISTRICT_SCHOOLS);
    if(loading) return <Paragraph>Loading...</Paragraph>;
    if(error) return <DataError />

    const {districtSchools} = data;
    const ListSeparator = () => <Separator />;

    return (
        <SettingsLayout>
            <TextContainer>
                <Paragraph>
                    Please select the school levels you want to receive information from, you can adjust it later in the app settings .
                </Paragraph>
            </TextContainer>
            <ListContainer>
                <FlatList
                    data={districtSchools.edges}
                    renderItem={({item}) => {
                        const key_name = item.node.slug.replace(/-/g, '_');

                        return (
                            <SettingsItem
                            active={preferences[key_name] === undefined ? false : preferences[key_name]}
                            handleSettings={(active) => handleFilter(item.node.slug, active)}
                            settingsName={item.node.slug}
                            type='settings'
                            theme={theme}
                            {...item.node}
                            >
                                {item.node.name}
                            </SettingsItem>
                        )
                    }}
                    keyExtractor={item => item.node.databaseId.toString()}
                    ItemSeparatorComponent={ListSeparator}
                />
            </ListContainer>  
        </SettingsLayout>
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

export default Preferences;