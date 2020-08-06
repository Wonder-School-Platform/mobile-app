import 'react-native-gesture-handler';
import {Asset} from 'expo-asset';
import { AppLoading } from 'expo';

import React, {useState, useEffect} from 'react';
import { Text, Platform, TouchableWithoutFeedback } from 'react-native';

import { ApolloProvider } from 'react-apollo';
import {keystoneClient, schoolClient} from './src/apollo/client';
import { Query } from 'react-apollo';
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MenuTabs = createBottomTabNavigator();

const Stack = createStackNavigator();

import PostListSkeleton from './src/containers/PostListSkeleton';
import Layout from './src/containers/Layout';
import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import FullPost from './src/screens/FullPost';
import FullEvent from './src/screens/FullEvent';
import UpcomingEvents from './src/screens/UpcomingEvents';
import More from './src/screens/More';
import FullPage from './src/screens/FullPage';
import Preferences from './src/screens/Preferences';
import WeeklyMenu from './src/screens/WeeklyMenu';

//Queries
import {APP_SETTINGS, WEEKLY_MENU_POSTS_QUERY} from './src/Utils/Queries';
import DataError from './src/components/DataError';

// AsyncStorage Keys
const SETTINGS_KEY = '@save_settings';
const LOGO_KEY = '@save_logo';

export default function App(props) {
  const [userPreferences, setUserPreferences] = useState([]);
  const [appSettings, setAppSettings] = useState({});

  useEffect(() => {
    loadAsync();
    readData();
  }, []);

  useEffect(() => {
    saveData(SETTINGS_KEY, appSettings);
    //
    setLogo(appSettings.school_settings && appSettings.school_settings.schoolLogo.sourceUrl);
  }, [appSettings]);

  const [onboarding, setOnboarding] = useState(false);

  const readData = async () => {
    try {
      //Retrive alrady stored key from Preferences view
      let storedPreferences = await AsyncStorage.getItem('@save_preferences');
      let storedOnboarding = await AsyncStorage.getItem('@save_onboarding');
      
      if (storedPreferences !== null) {
        let preferencesList = JSON.parse(storedPreferences);
        let newList = [];
        for (const [key, value] of Object.entries(preferencesList)) {
          const filterKey = key.replace(/_/g, '-');
          value === true ? newList.push(filterKey) : null
        }
        setUserPreferences(newList);
      }

      if(storedOnboarding !== null) {
        const hideOnboarding = JSON.parse(storedOnboarding);
        setOnboarding(hideOnboarding);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
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

  let schoolTheme;
  
  //funtion to save settings once query is complete
  const handleSettings = (data) => {
    setAppSettings(data.appSettings);
    schoolTheme = {
      dark: false,
      colors: {
        primary: data.appSettings.color_settings.primaryColor,
        primaryLighten: data.appSettings.color_settings.primaryLighter,
        background: data.appSettings.color_settings.backgroundColor,
        card: data.appSettings.color_settings.cardColor,
        text: data.appSettings.color_settings.textColor,
        border: data.appSettings.color_settings.borderColor,
        icon: data.appSettings.color_settings.iconColor,
        overPrimary: data.appSettings.color_settings.cardColor,
        shadow: 'rgb(138, 138, 138)',
      },
      fontSizes: {
        schoolName: '22px',
        regular: '18px'
      }
    };
  }

  //Retriving Logo
  const [logo, setLogo] = useState('');

  useState(() => {
    saveData(LOGO_KEY, logo);
  }, [logo]);

  //Load resources
  const [loadingComplete, setLoadingComplete] = useState(false);

  const _cacheResourcesAsync = async () => {
    const images = [require('./src/images/logo.png')];

    const cacheImages = images.map(image =>{
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }
  
  async function loadAsync() {
    // Load fonts
    await Expo.Font.loadAsync({
      //Ionicons.font,
      'Lato-Regular': require('./src/fonts/Lato-Regular.ttf'),
      'Lato-Black': require('./src/fonts/Lato-Black.ttf'),
      'Lato-Bold': require('./src/fonts/Lato-Bold.ttf'),
      'Lato-Italic': require('./src/fonts/Lato-Italic.ttf'),
      'Lato-Light': require('./src/fonts/Lato-Light.ttf'),
      
      'Lato-Thin': require('./src/fonts/Lato-Thin.ttf'),
      'Muli-Bold': require('./src/fonts/Muli-Bold.ttf'),
    });
  }

  const HomeTabs = () => {
    return (
      <ApolloProvider client={schoolClient}>
        <Query query={APP_SETTINGS}>
            {({loading, error, data}) => {
                if (loading) return <Text>Loading</Text>
                if (error) return <Text>Error</Text>

                handleSettings(data);

                return (
                  <MenuTabs.Navigator
                    screenOptions={({ route }) => ({
                      tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        color = focused ? schoolTheme.colors.primary : color;
                        size = 24;
                        
                        if (route.name === 'Home') {
                          iconName = 'md-home';
                        } else if (route.name === 'Menu') {
                          iconName = 'food-fork-drink';
                          return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                        } else if (route.name === 'Events') {
                          iconName = 'md-calendar';
                        } else if (route.name === 'More') {
                          iconName = 'dots-horizontal-circle';
                          return <MaterialCommunityIcons name={iconName} size={size} color={color} />
                        }
            
                        // the returned icon for each tab
                        return (
                          route.name !== 'Menu' &&
                          route.name !== 'More' &&
                            <Ionicons name={iconName} size={size} color={color} />
                        ) 
                      },
                    })}
                    tabBarOptions={{
                      barStyle: { backgroundColor: schoolTheme.colors.card },
                      activeTintColor: schoolTheme.colors.primary,
                      inactiveTintColor: schoolTheme.colors.icon,
                      showLabel: false,
                      shadow: true,
                      style: {
                        ...Platform.select({
                          android: {
                            elevation: 6
                          },
                          ios: {
                            shadowOffset: {
                              width: 0,
                              height: -4
                            },
                            shadowColor: 'rgb(138, 138, 138)',
                            shadowOpacity: 0.21,
                            shadorRadius: 4,
                          }
                        })
                      }
                    }}
                    >
                    <MenuTabs.Screen name="Home"
                      component={HomeStack}
                    />
                    <MenuTabs.Screen name="Menu"
                      component={KeystoneStack}
                    />
                    <MenuTabs.Screen name="Events"
                      component={EventsStack}
                    />
                    <MenuTabs.Screen name="More"
                      component={SettingsStack}
                    />
                  </MenuTabs.Navigator>
                )
            }}
        </Query>
      </ApolloProvider>
    );
  }

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home'
          options={{
            title: `${appSettings.school_settings && appSettings.school_settings.schoolName}`,
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
            headerLeft: null,
          }}
        >
          {props => 
            <Layout>
              <Home
                {...props}
                theme={schoolTheme}
                preferences={userPreferences}
              />
            </Layout>
          }
        </Stack.Screen>
        <Stack.Screen name='Full Post'
          options={{
            title: 'Back to Feed',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><FullPost {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
        <Stack.Screen name='Full Event'
          options={{
            title: 'Back to Feed',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><FullEvent {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const EventsStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Events'
          options={{
            title: 'Upcoming Events',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><UpcomingEvents {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
        <Stack.Screen name='Full Event'
          options={{
            title: 'Back to Events Calendar',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><FullEvent {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const SettingsStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='More'
          options={{
            title: 'More About our School',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><More {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
        <Stack.Screen name='Full Page'
          options={{
            title: 'Back to More About the School',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><FullPage {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
        <Stack.Screen name='Preferences'
          options={{
            title: 'Select your interests',
            headerStyle: {
              backgroundColor: schoolTheme.colors.primary
            },
            headerTintColor: schoolTheme.colors.card,
          }}
        >
          {props => <Layout><Preferences {...props} theme={schoolTheme} /></Layout>}
        </Stack.Screen>
      </Stack.Navigator>
    )
  }

  const KeystoneStack = () => {
    const currentSchool = appSettings.school_settings.mainTaxonomySlug;
    
    return (
      <ApolloProvider client={keystoneClient}>
        <Query query={WEEKLY_MENU_POSTS_QUERY} variables={
          {currentSchool: currentSchool}
        }>
            {({loading, error, data}) => {
              if (loading) return <PostListSkeleton />
              if (error) return <DataError theme={schoolTheme} error={error} />
              return (
                <WeeklyMenu data={data} theme={schoolTheme} />
              )
            }}
        </Query>
      </ApolloProvider>
    )
  }

  return (
    loadingComplete === false ? 
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setLoadingComplete(true)}
        onError={console.warn}
      /> :
      <NavigationContainer>
          <Stack.Navigator headerMode={'none'}>
            {onboarding === false &&
              <Stack.Screen name='Onboarding'>
                {props => 
                    <ApolloProvider client={schoolClient}>
                        <Query query={APP_SETTINGS}>
                            {({loading, error, data}) => {
                                if (loading) return <Text>Loading</Text>
                                if (error) return <Text>Error</Text>

                                handleSettings(data);

                                return (
                                  <Layout>
                                    <Onboarding
                                      logo={logo}
                                      theme={schoolTheme}
                                      {...props}
                                    />
                                  </Layout>
                                )
                            }}
                        </Query>
                    </ApolloProvider>
                }
              </Stack.Screen>
            }
            <Stack.Screen name='Main'
              component={HomeTabs}
              {...props}
            />
            <Stack.Screen name='Keystone'>
              {props => <Layout><KeystoneStack/></Layout>}
            </Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  );
};
