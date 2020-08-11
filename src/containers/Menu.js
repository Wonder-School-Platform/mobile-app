import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, Dimensions, View, FlatList } from 'react-native';
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
    console.log(menuPlan);
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
        Meal.push(filtered.meal)
        Option1.push(filtered.option1[0])
        Option2.push(filtered.option2[0])
      }
    });
  }
  MenuToShow(dayToShow);

  const optionMeals = `
    <p><b>Option Meal 1: </b> ${Option1[0] && Option1[0].title}</p>
    <p><b>Option Meal 2: </b> ${Option2[0] && Option2[0].title}</p>
  `

  /* console.log('Meal :', Meal);
  console.log('Option 1', Option1);
  console.log('Option 2', Option2); */

  //Nutritional Information
  let allergens,
  carbs,
  fat,
  fiber,
  fieldGroupName,
  kcal,
  portionSize,
  protein,
  recipeNumber,
  sodium;

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

  console.log(dataSchools)

  return (
    <SafeAreaView style={styles.safeArea}>
        <DropDownPicker
        items={dataSchools && dataSchools}
        containerStyle={{height: 50}}
        style={{backgroundColor: theme.colors.primary, borderWidth: 0}}
        dropDownStyle={{backgroundColor: theme.colors.primary, borderColor: theme.colors.primary}}
        itemStyle={{
            justifyContent: 'flex-start',
            backgroundColor: theme.colors.primary,
        }}
        arrowStyle={{color: 'white'}}
        labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#fff',
        }}
        activeLabelStyle={{fontFamily: 'Lato-Black'}}
        placeholder='Filter by School'
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
            <Ionicons name={'md-restaurant'} size={24} color={'#ffffff'} />
          </IconContainer>
          <PostHeaderContainer>
            <Title theme={theme}>
              <ScalableText style={styles.title}>
                {Meal[0] && Meal[0].createAMeal[0].title}
              </ScalableText>
            </Title>
            <Date theme={theme}>
              <ScalableText style={styles.date}>
              {`with ${Option1[0] && Option1[0].title} & ${Option2[0] && Option2[0].title}`}
              </ScalableText>
            </Date>
          </PostHeaderContainer>
        </PostHeader>
        <Container>
          <NutritionalFacts style={styles.NF_Card}>
            <Title theme={theme}>Nutritional Facts:</Title>
            <Text>Portion Size 1 cup</Text>
            <View style={styles.NF_Big_separator}></View>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Calories</Text>
              <Text>{`${getKcal()} kcal`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Fat</Text>
              <Text>{`${getFat()} g`}</Text>
            </NutritionalFactsRow>

            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Sodium</Text>
              <Text>{`${getSodium()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Carbs</Text>
              <Text>{`${getCarbs()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Fiber</Text>
              <Text>{`${getFiber()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Protein</Text>
              <Text>{`${getProtein()} g`}</Text>
            </NutritionalFactsRow>
            <NutritionalFactsRow>
              <Text style={styles.subtitle}>Allergens</Text>
              <Text>{getAllergens()}</Text>
            </NutritionalFactsRow>
            <View style={styles.NF_Big_separator}></View>
          </NutritionalFacts>
          
          <HTML html={optionMeals} />

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