import React from 'react';
import Text from 'react-native';
import TheMenu from '../containers/Menu';
import { useQuery } from 'react-apollo';
import ApolloClient from "apollo-boost";
import gql from 'graphql-tag';
import PostSkeleton from '../components/Post/PostSkeleton';
import DataError from '../components/DataError';
import {Ionicons} from '@expo/vector-icons';

const keystoneClient = new ApolloClient({
  uri: 'https://keystone.wschoolsdev.wpengine.com/graphql',
});


const WEEKLY_MENU_POSTS_QUERY = gql`
  query WEEKLY_MENU_POSTS_QUERY {
    posts {
      title
    }
  }
`

const KeystoneMenu = () => {
  const {loading, error, data } = useQuery(
    WEEKLY_MENU_POSTS_QUERY,
    { client:  keystoneClient }
  );

  if(loading) return <PostSkeleton/>;
  if(error){
    console.log(error);
    return <DataError />
  };

  return (
    <Text>Data loaded!</Text>
  );
};


const WeeklyMenu = () => {
  return (
    <KeystoneMenu />
  );
};

export default WeeklyMenu;