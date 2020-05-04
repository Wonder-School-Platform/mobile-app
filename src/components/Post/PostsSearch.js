import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import SearchResults from './SearchResults';


const PostsSearch = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = () => {
    console.log('submit')
    console.log(searchQuery)
  }

  const handleInput = search => {
    setSearchQuery(search)
    console.log(searchQuery)
  }

  return (
    <View>
      <TextInput
        {...props}
        editable
        maxLength={40}
        autoCorrect={false}
        autoCapitalize='none'
        placeholder='search some posts'
        onSubmitEditing={handleSubmit}
        onChangeText={handleInput}
      />
      <SearchResults searchQuery={searchQuery} />
    </View>
  );
};

export default PostsSearch;