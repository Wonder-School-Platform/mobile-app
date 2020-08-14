import gql from 'graphql-tag';

export const APP_SETTINGS = gql`
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
        mainTaxonomySlug
      }
    }
  }
`
//Keystone App Queries
export const WEEKLY_MENU_POSTS_QUERY = gql`
  query MyQuery($currentSchool: [String]) {
    districtSchools(where: {slug: $currentSchool}) {
      edges {
        node {
          slug
          children {
            edges {
              node {
                slug
                name
                menuPlans {
                  edges {
                    node {
                      title
                      menuPlan_month {
                        menuPlanMonth
                      }
                      daily_menu {
                        menuPlan {
                          fieldGroupName
                          menuDate
                          breakfast {
                            createAMeal {
                              ... on Recipe {
                                id
                                title
                                recipe_nutritional_info {
                                  allergens
                                  carbs
                                  fat
                                  fiber
                                  fieldGroupName
                                  kcal
                                  portionSize
                                  protein
                                  recipeNumber
                                  sodium
                                }
                              }
                            }
                            featuredImage {
                              sourceUrl(size: MEDIUM)
                            }
                          }
                          breakfastOption1 {
                            ... on Recipe {
                              id
                              title
                            }
                          }
                          breakfastOption2 {
                            ... on Recipe {
                              id
                              title
                            }
                          }
                          lunch {
                            createAMeal {
                              ... on Recipe {
                                id
                                title
                                recipe_nutritional_info {
                                  allergens
                                  carbs
                                  fat
                                  fiber
                                  fieldGroupName
                                  kcal
                                  portionSize
                                  protein
                                  recipeNumber
                                  sodium
                                }
                              }
                            }
                            featuredImage {
                              sourceUrl(size: MEDIUM)
                            }
                          }
                          lunchOption1 {
                            ... on Recipe {
                              id
                              title
                            }
                          }
                          lunchOption2 {
                            ... on Recipe {
                              id
                              title
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`