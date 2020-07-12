import 'react-native-gesture-handler';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';

import { ApolloProvider } from 'react-apollo';
import client from './src/apollo/client';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';

import { AppearanceProvider } from 'react-native-appearance';

import { ThemeProvider } from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
/*import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';*/
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather} from '@expo/vector-icons';
import {SplashScreen} from 'expo';

import Layout from './src/containers/Layout';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import FullPost from './src/screens/FullPost';
import FullEvent from './src/screens/FullEvent';
import FullPage from './src/screens/FullPage';
import Preferences from './src/screens/Preferences';
import Onboarding from './src/screens/Onboarding';
import WeeklyMenu from './src/screens/WeeklyMenu';
import UpcomingEvents from './src/screens/UpcomingEvents';
import More from './src/screens/More';

/*import * as Sentry from 'sentry-expo';
Sentry.init({
  dsn: 'https://87a4c7f345804b3babab4f92142ce4b3@o419152.ingest.sentry.io/5328834',
  enableInExpoDevelopment: true,
  debug: true,
});*/


const MenuTabs = createBottomTabNavigator();

const Stack = createStackNavigator();

const APP_SETTINGS = gql`
  {
    appSettings {
      color_settings {
        backgroundColor
        borderColor
        cardColor
        iconColor
        primaryColor
        primaryLighter
        textColor
      }
      school_settings {
        schoolName
        schoolLogo {
          sourceUrl
        }
      }
    }
  }
`

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

  //funtion to save settings once query is complete
  const handleSettings = (data) => {
    setAppSettings(data.appSettings);
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

 return (
    loadingComplete === false ? 
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setLoadingComplete(true)}
        onError={console.warn}
      /> :
      <ApolloProvider client={client}>
        <Query query={APP_SETTINGS}>
          {({ loading, error, data }) => {
            if (loading) return <Splash />;
            if (error) return <Text>Error! {error.message}</Text>;

            handleSettings(data);

            const schoolTheme = {
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

            const OnboardingStack = () => {
              return (
                <Stack.Navigator
                  headerMode='none'
                >
                  {onboarding === false && <Stack.Screen
                    name='Onboarding'
                  >
                    {props => 
                      <Layout>
                        <Onboarding
                          logo={logo}
                          theme={schoolTheme}
                          {...props}
                        />
                      </Layout>
                    }
                  </Stack.Screen>}
                  <Stack.Screen
                    name='Home'
                    component={HomeTabs}
                    {...props}
                  />
                </Stack.Navigator>
              )
            }

            const HomeTabs = () => {
              return (
                <MenuTabs.Navigator
                  barStyle={{ backgroundColor: schoolTheme.colors.card }}
                  activeColor={schoolTheme.colors.primary}
                  inactiveColor={schoolTheme.colors.icon}
                >
                  <MenuTabs.Screen name="Home"
                    component={HomeStack}
                    options={{
                      tabBarLabel: 'Home',
                      tabBarIcon: ({ color }) => (
                        <Ionicons name={'md-home'} size={24} color={color} />
                      )
                    }}
                  />
                  <MenuTabs.Screen name="Menu"
                    options={{
                      tabBarLabel: 'Weekly Menu',
                      tabBarIcon: ({ color }) => (
                        <Ionicons name={'md-restaurant'} size={24} color={color} />
                      )
                    }}
                  >
                    {props => <Layout><WeeklyMenu {...props} theme={schoolTheme} /></Layout>}
                  </MenuTabs.Screen>
                  <MenuTabs.Screen name="Events"
                    component={EventsStack}
                    options={{
                      tabBarLabel: 'Events',
                      tabBarIcon: ({ color }) => (
                        <Ionicons name={'md-calendar'} size={24} color={color} />
                      )
                    }}
                  />
                  <MenuTabs.Screen name="More"
                    component={SettingsStack}
                    style={{borderRadius: 30}}
                    options={{
                      tabBarLabel: 'More',
                      tabBarIcon: ({ color }) => (
                        <Feather name="more-horizontal" size={22} color={color} />
                      )
                    }}
                  />
                </MenuTabs.Navigator>
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

            return (
              <AppearanceProvider>
                <ThemeProvider theme={schoolTheme}>
                  <NavigationContainer theme={schoolTheme}>
                    <OnboardingStack />
                  </NavigationContainer>
                </ThemeProvider>
              </AppearanceProvider>
            );
          }}
        </Query>
      </ApolloProvider >
  );
    

};