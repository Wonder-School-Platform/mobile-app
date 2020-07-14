//Delete
import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

const APP_SETTINGS = gql`
  {
    appSettings {
      color_settings {
        backgroundColor
        borderColor
        cardColor
        iconColor
        primaryColor
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

const AppSettings = () => {
    const {loading, error, data} = useQuery(APP_SETTINGS);
    if(loading) console.log('Loading Settings...');
    if(error) console.log(error);

    const [appSettings, setAppSettings] = useState({});

    useEffect(() => {  
        setAppSettings({
        dark: false,
        colors: {
            primary: data.appSettings.color_settings.primaryColor,
            background: data.appSettings.color_settings.backgroundColor,
            card: data.appSettings.color_settings.cardColor,
            text: data.appSettings.color_settings.textColor,
            border: data.appSettings.color_settings.borderColor,
            icon: data.appSettings.color_settings.iconColor,
        }
        })
    }, []);
    return (
        <></>
    );
};

export default AppSettings;