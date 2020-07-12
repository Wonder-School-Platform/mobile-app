import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, View } from 'react-native';
import HTML from 'react-native-render-html';
const Entities = require('html-entities').XmlEntities;
import {Ionicons} from '@expo/vector-icons';

import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import {
  FeaturedImage,
  MainImg,
  IconContainer,
  PostHeader,
  PostHeaderContainer,
  Title,
  Container
} from '../theme/Styles';
import { Date } from '../components/Post/Styles';
import PrimaryButton from '../components/PrimaryButton';
import * as Icons from '../components/Icons';
import Theme from '../theme/Theme';
import moment from 'moment';

import ScalableText from 'react-native-text';
import { scaleText } from 'react-native-text';

//import { Dropdown } from 'react-native-material-dropdown';

const entities = new Entities();

const TheMenu = ({ data, theme }) => {
  const handleWeekDay = () => {
    if (moment().isoWeekday() <= 5) {
      return moment().format('ddd');
    } else {
      return moment(moment().day('Friday')._d).format('ddd');
    }
  }
  const today = handleWeekDay();
  const tagEvents = data.tags.edges;
  //const [isMeal, setIsMeal] = useState(moment().format('HH') < 12 ? 'Breakfast' : 'Lunch');
  const [isMeal, setIsMeal] = useState('Lunch');
  const [dayToShow, setDayToShow] = useState(today);
  const [isWeek, setIsWeek] = useState(0);

  //All Menus
  let listAllMenus = []
  function createList() {
    tagEvents.map(item => {
      item.node.events.edges.map(i => {
        if (listAllMenus.length <= 0) {
          listAllMenus.push(i.node)
        } else {
          let exist = false;
          listAllMenus.forEach(element => {
            if (element.databaseId === i.node.databaseId) {
              exist = true;
            }
          });
          if (exist === false) {
            listAllMenus.push(i.node)
          }
        }
      })
    })
  };
  createList();

  const [activeDate, setActiveDate] = useState(moment().format('DD'));
  const weekDates = {
    Mon: moment(moment().day('Monday').add(isWeek, 'weeks')._d).format('DD'),
    Tue: moment(moment().day('Tuesday').add(isWeek, 'weeks')._d).format('DD'),
    Wed: moment(moment().day('Wednesday').add(isWeek, 'weeks')._d).format('DD'),
    Thu: moment(moment().day('Thursday').add(isWeek, 'weeks')._d).format('DD'),
    Fri: moment(moment().day('Friday').add(isWeek, 'weeks')._d).format('DD'),
  };

  //Define the Menu to show
  let Menu = [];
  let BreakfastMenu = [];
  let LunchMenu = [];
  function MenuToShow(showThis, meal) {
    listAllMenus.filter(filtered => {
      if (moment(filtered.start_date).format('ddd') === showThis) {
        Menu.push(filtered)
      }
    })
    Menu.filter(filtered => {
      if (filtered.tags.edges[0].node.name === 'Breakfast') {
        BreakfastMenu = [];
        BreakfastMenu.push(filtered);
      } else {
        LunchMenu = [];
        LunchMenu.push(filtered);
      }
    })
  }
  MenuToShow(dayToShow, isMeal);

  const handleDateToShow = ((dayName, dayNumber) => {
    setDayToShow(dayName);
    setActiveDate(dayNumber);
  })

  const handleMeal = () => {
    //setIsMeal(isMeal === 'Breakfast' ? 'Lunch' : 'Breakfast');
  }

  const handleIsWeek = (direction) => {
    if (direction === 'left') {
      setIsWeek(isWeek - 1);
    } else {
      setIsWeek(isWeek + 1);
    }
  }

  const imageHeight = Dimensions.get('window').height / 2.8;
  const iconWidth = Dimensions.get('window').width / 8;
  const iconWidthPx = iconWidth + 'px';

  let dataSchools = [
    {
      value: 'Cherokee Elementary'
    },
    {
      value: 'Helen Paul Learning Center'
    },
    {
      value: 'High School'
    },
    {
      value: 'Wells Middle School'
    }]

  return (
    <SafeAreaView style={styles.safeArea}>
      /*<Dropdown
        label="Select Different School to check the menu"
        data={dataSchools}
        style={{color:'white'}}
        value={'Wells Middle School'}
        containerStyle={{marginHorizontal: 10, marginBottom: 0,}}
        pickerStyle={styles.dropdownPicker}
        itemTextStyle={styles.dropdownitemTextStyle}
        baseColor={'rgba(255, 255, 255, 0.8)'}
        textColor={'rgba(255, 255, 255, 1)'}
        overlayStyle={styles.dropdownoverlayStyle}
        rippleInsets={{top: 20}}
        />*/
        
      <ScrollView style={styles.wrapper}>
        <FeaturedImage  theme={theme} style={{ height: imageHeight }}>
          {isMeal === 'Breakfast' ?
            BreakfastMenu.length > 0 && BreakfastMenu[0].featuredImage && <MainImg source={{ uri: BreakfastMenu[0].featuredImage.sourceUrl }} />
            :
            LunchMenu[0].featuredImage && <MainImg source={{ uri: LunchMenu[0].featuredImage.sourceUrl }} />
          }
          <WeekNavigation
            weekDates={weekDates}
            calendarDate={activeDate}
            handleDateToShow={handleDateToShow}
            handleIsWeek={handleIsWeek}
          />
          
        </FeaturedImage >
        <PostHeader style={styles.shadow}>
          <IconContainer height={iconWidthPx} width={iconWidthPx}>
            <Ionicons name={'md-restaurant'} size={24} color={'#ffffff'} />
          </IconContainer>
          <PostHeaderContainer>
            <Title>
              <ScalableText style={styles.title}>
                {BreakfastMenu.length > 0 && isMeal === 'Breakfast' ?
                  entities.decode(BreakfastMenu[0].title)
                  :
                  entities.decode(LunchMenu[0].title)
                }
              </ScalableText>
            </Title>
            <Date>
              <ScalableText style={styles.date}>
                {`${isMeal} for ${dayToShow}`}
              </ScalableText>
            </Date>
          </PostHeaderContainer>
        </PostHeader>
        <Container>
          <HTML
            html={
              BreakfastMenu.length > 0 && isMeal === 'Breakfast' ?
                BreakfastMenu[0].content
                :
                LunchMenu[0].content
            }
            imagesMaxWidth={Dimensions.get('window').width - 48}
            baseFontStyle={{ fontFamily: 'Lato-Regular' }}
            {...htmlStyles}
          />
          {/* <PrimaryButton
            onPress={handleMeal}
            text={isMeal === 'Breakfast' ? "See Lunch Menu" : "See Breakfast Menu"}
          /> */}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#00421c',
    flex: 1,
  },
  dropdownPicker: {
    backgroundColor: '#00421c',
    top: '50%',
    display: 'flex',
    position: 'relative',

  },
  dropdownitemTextStyle:{
    color: 'white'
  },
  dropdownoverlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  paddingH: {
    paddingHorizontal: 24
  },
  shadow: {
    shadowColor: 'rgb(138, 138, 138)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.21,
    shadowRadius: 4,

    elevation: 4,
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 16,
  },

});

//HTML Component Styles
const htmlStyles = {
  tagsStyles: {
    p: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    a: {
      color: '#00421c',
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    img: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      marginBottom: 32,
      marginTop: 16,
    },
    ul: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    ol: {
      fontSize: 18,
      marginBottom: 16,
      lineHeight: 26,
      fontFamily: 'Lato-Light',
    },
    h1: {
      fontSize: 25,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h2: {
      fontSize: 24,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h3: {
      fontSize: 22,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h4: {
      fontSize: 20,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h5: {
      fontSize: 18,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    },
    h6: {
      fontSize: 18,
      marginBottom: 16,
      fontFamily: 'Muli-Bold',
    }
  }
};

export default TheMenu;