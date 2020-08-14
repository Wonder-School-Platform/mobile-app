import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, View, Switch } from 'react-native';
import HTML from 'react-native-render-html';
const Entities = require('html-entities').XmlEntities;
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

import WeekNavigation from '../components/WeeklyMenu/WeekNavigation';
import {
  FeaturedImage,
  MainImg,
  IconContainer,
  PostHeader,
  PostHeaderContainer,
  Paragraph,
  Title,
  Container,
  NutritionalFacts,
  NutritionalFactsRow,
} from '../theme/Styles';
import { Date } from '../components/Post/Styles';
import PrimaryButton from '../components/PrimaryButton';
import * as Icons from '../components/Icons';
import moment from 'moment';

import ScalableText from 'react-native-text';
import { scaleText } from 'react-native-text';

import DropDownPicker from 'react-native-dropdown-picker';

const entities = new Entities();

const TheMenu = ({ data, theme }) => {
  //Hooks
  const [selectedSchool, setSelectedSchool] = useState();
  useEffect(() => {
    currentSchool();
  },[])
  const [activeDate, setActiveDate] = useState(moment().format('DD'));
  const [dayToShow, setDayToShow] = useState('');
  useEffect(() => {
    setDayToShow(today);
  },[])
  const [isWeek, setIsWeek] = useState(0);

  const [isMeal, setIsMeal] = useState('');
  useEffect(() => {
    setIsMeal(moment().format('HH') <= 11 ? 'Breakfast' : 'Lunch');
  }, []);

  //Handling days and dates
  const handleWeekDay = () => {
    if (moment().isoWeekday() <= 5) {
      return moment().format('DD');
    } else {
      return moment(moment().day('Friday')._d).format('DD');
    }
  }
  const today = handleWeekDay();
  const weekDates = {
    Mon: moment(moment().day('Monday').add(isWeek, 'weeks')._d).format('DD'),
    Tue: moment(moment().day('Tuesday').add(isWeek, 'weeks')._d).format('DD'),
    Wed: moment(moment().day('Wednesday').add(isWeek, 'weeks')._d).format('DD'),
    Thu: moment(moment().day('Thursday').add(isWeek, 'weeks')._d).format('DD'),
    Fri: moment(moment().day('Friday').add(isWeek, 'weeks')._d).format('DD'),
  };

  const handleDateToShow = (dayNumber => {
    setDayToShow(dayNumber);
    setActiveDate(dayNumber);
  });

  const handleIsWeek = (direction) => {
    if (direction === 'left') {
      setIsWeek(isWeek - 1);
    } else {
      setIsWeek(isWeek + 1);
    }
  };

  // Handling School Menu Data
  let dataSchools = [];
  
  const currentMonth = moment().format('MM-Y');
  function schoolsOfDistrict() {
    data & data.districtSchools.edges.map(district => {
      return district.node.children.edges.map(school => {
        dataSchools.push({
          value: school.node.slug,
          label: school.node.name
        })
      });
  })[0]};
  schoolsOfDistrict();

  const handleSelectedSchool = item => {
    console.log(item.value);
    //setSelectedSchool(item.value);
  }

  function currentSchool() {
    const districtSchools = data.districtSchools.edges;
    const showSchool = districtSchools.map(district => {
      return district.node.children.edges[0].node.menuPlans;
    })[0];
    
    const activeMenu = showSchool.edges.filter(menu => menu.node.menuPlan_month.menuPlanMonth === currentMonth);
    const menuPlan = activeMenu[0].node.daily_menu.menuPlan;
    setSelectedSchool(menuPlan);
  };

  //All Menus
  let listAllMenus = []
  function createList() {
    selectedSchool && selectedSchool.map(item => {
      listAllMenus.push(item);
    })
  };
  createList();

  //Define the Menu to show
  let Meal = [];
  let Option1 = [];
  let Option2 = [];
  function MenuToShow(showThis) {
    listAllMenus.filter(filtered => {
      if (moment(filtered.menuDate).format('DD') === showThis) {
        console.log(showThis, isMeal);
        if (isMeal === 'Breakfast') {
          Meal.push(filtered.breakfast)
          Option1.push(filtered.breakfastOption1[0])
          Option2.push(filtered.breakfastOption2[0])
        } else {
          Meal.push(filtered.lunch)
          Option1.push(filtered.lunchOption1[0])
          Option2.push(filtered.lunchOption2[0])
        }
      }
    });
  }
  MenuToShow(dayToShow, isMeal);

  const mealItems = [];
  Meal[0] && Meal[0].createAMeal.map(item => mealItems.push(item.title));

  const optionMeal1Items = [];
  Option1 && Option1.map(item => optionMeal1Items.push(item.title));
  
  const optionMeal2Items = [];
  Option2 && Option2.map(item => optionMeal2Items.push(item.title));

  /* console.log('Meal :', Meal);
  console.log('Option 1', Option1);
  console.log('Option 2', Option2); */

  //Nutritional Information

  const getKcal = () => {
    let totalKcal = 0;
    Meal[0] && Meal[0].createAMeal.map(item => {
      totalKcal = totalKcal + item.recipe_nutritional_info.kcal
    });
    return totalKcal.toFixed(2);
  }
  
  const getFat = () => {
    let totalFat = 0;
    Meal[0] && Meal[0].createAMeal.map(item => {
      totalFat = totalFat + item.recipe_nutritional_info.fat
    });
    return totalFat.toFixed(2);
  }
  
  const getSodium = () => {
    let totalSodium = 0;
    Meal[0] && Meal[0].createAMeal.map(item => {
      totalSodium = totalSodium + item.recipe_nutritional_info.sodium
    });
    return totalSodium.toFixed(2);
  }
  
  const getCarbs = () => {
    let totalCarbs = 0;
    Meal[0] && Meal[0].createAMeal.map(item => {
      totalCarbs = totalCarbs + item.recipe_nutritional_info.carbs
    });
    return totalCarbs.toFixed(2);
  }
  
  const getFiber = () => {
    let totalFiber = 0;
    Meal[0] && Meal[0].createAMeal.map(item => {
      totalFiber = totalFiber + item.recipe_nutritional_info.fiber
    });
    return totalFiber.toFixed(2);
  }
  
  const getProtein = () => {
    let totalProtein = 0;
    Meal[0] && Meal[0].createAMeal.map(item => {
      totalProtein = totalProtein + item.recipe_nutritional_info.protein
    });
    return totalProtein.toFixed(2);
  }
  
  const getAllergens = () => {
    let totalAllergens = [];
    Meal[0] && Meal[0].createAMeal.map(item => {
      item.recipe_nutritional_info.allergens && item.recipe_nutritional_info.allergens.map(allergen => {
        totalAllergens.push(allergen)
      })
    });
    totalAllergens = totalAllergens.join(', ');
    return totalAllergens;
  }

  const imageHeight = Dimensions.get('window').height / 2.8;
  const iconWidth = Dimensions.get('window').width / 8;
  const iconWidthPx = iconWidth + 'px';

  return (
    <SafeAreaView style={{
      backgroundColor: theme.colors.primary,
      flex: 1,
    }}>
        <DropDownPicker
        items={dataSchools && dataSchools}
        containerStyle={{height: 50, borderRadius: 0}}
        style={{backgroundColor: theme.colors.primary, borderWidth: 0}}
        dropDownStyle={{backgroundColor: theme.colors.primary, borderColor: theme.colors.primary}}
        itemStyle={{
            justifyContent: 'flex-start',
            backgroundColor: theme.colors.primary,
        }}
        arrowColor={'#ffffff'}
        arrowSize={24}
        labelStyle={{
            fontSize: 16,
            textAlign: 'left',
            color: '#ffffff',
            opacity: 0.5
        }}
        activeLabelStyle={{fontFamily: 'Lato-Black', opacity: 1}}
        placeholder='Filter Menus by School'
        onChangeItem={handleSelectedSchool}
    />
      
        
      <ScrollView style={styles.wrapper}>
        <FeaturedImage  theme={theme} style={{ height: imageHeight }}>
          <MainImg source={{ uri: Meal[0] && Meal[0].featuredImage.sourceUrl }} />
          <WeekNavigation
            weekDates={weekDates}
            calendarDate={activeDate}
            handleDateToShow={handleDateToShow}
            handleIsWeek={handleIsWeek}
            theme={theme}
          />
          
        </FeaturedImage >
        <PostHeader style={styles.shadow} theme={theme}>
          <IconContainer height={iconWidthPx} width={iconWidthPx} theme={theme}>
            <MaterialCommunityIcons name={'food-fork-drink'} size={24} color={'#ffffff'} />
          </IconContainer>
          <PostHeaderContainer>
            <Title theme={theme}>
              <ScalableText style={styles.title}>
                {isMeal}
              </ScalableText>
            </Title>
            <Date theme={theme}>
              <ScalableText style={styles.date}>
              {`${moment().format('MMMM')} ${dayToShow}, ${moment().format('YYYY')}`}
              </ScalableText>
            </Date>
          </PostHeaderContainer>
          <View style={{ width: 60, alignItems: 'center'}}>
            <Switch
              trackColor={{ false: "#7e7e7e", true: "#7e7e7e" }}
              thumbColor="#ffffff"
              ios_backgroundColor="#7e7e7e"
              onValueChange={() => setIsMeal(isMeal === 'Breakfast' ? 'Lunch' : 'Breakfast')}
              value={isMeal === 'Breakfast' ? false : true}
              style={{marginBottom: 5}}
            />
            <Text
              style={{color: '#7e7e7e', fontSize: 7, textTransform: 'uppercase'}}
            >
              {`see ${isMeal === 'Breakfast' ? 'Lunch' : 'Breakfast'}`}
            </Text>
          </View>
        </PostHeader>
        <Container>
          <Title theme={theme}>Description:</Title>
          <Paragraph theme={theme}>{mealItems.join(', ')}</Paragraph>
          <NutritionalFacts style={styles.NF_Card}>
            <Title theme={theme}>Nutritional Facts:</Title>
            <Text>Portion Size 1 cup</Text>
            <View style={styles.NF_Big_separator}></View>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Calories:</Text>
              <Text>{`${getKcal()} kcal`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Fat:</Text>
              <Text>{`${getFat()} g`}</Text>
            </NutritionalFactsRow>

            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Sodium:</Text>
              <Text>{`${getSodium()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Carbs:</Text>
              <Text>{`${getCarbs()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Fiber:</Text>
              <Text>{`${getFiber()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Protein:</Text>
              <Text>{`${getProtein()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Allergens:</Text>
              <Text style={{flex: 1, flexWrap:'wrap'}}>{getAllergens()}</Text>
            </NutritionalFactsRow>
            <View style={styles.NF_Big_separator}></View>
          </NutritionalFacts>
          
          {Option1[0] &&
            <>
              <Title theme={theme}>Lunch Option 1:</Title>
              <Paragraph theme={theme}>{optionMeal1Items}</Paragraph>
            </>
          }
          
          {Option2[0] &&
            <>
              <Title theme={theme}>Lunch Option 2:</Title>
              <Paragraph theme={theme}>{optionMeal2Items}</Paragraph>
            </>
          }

        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

/* export default class StyleSheetFactory {
  static getSheet(iconSize, iconColor) {
      return StyleSheet.create({
          icon : {
              color: iconColor,
              fontSize: iconSize
          }
      })
  }
}

// index.js

render() {
  let myStyleSheet = StyleSheetFactory.getSheet(64, 'red')
} */

export class MenuStyles {
  static MenusStylesheet(theme) {
    return StyleSheet.create({
      safeArea: {
        backgroundColor: theme.colors.backgroundColor,
        flex: 1,
      }
    })
  }
};

const styles = StyleSheet.create({
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
  row: {
    flexDirection: 'row',
  },
  subtitle: {
    fontFamily: 'Lato-Bold',
    marginRight: 5,
  },
  NF_Big_separator: {
    backgroundColor: 'black',
    height: 5,
    marginVertical: 3,
  },
  NF_Card: {
    marginBottom: 24
  }
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