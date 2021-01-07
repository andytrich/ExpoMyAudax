import React from 'react';
import {Text, View} from 'react-native'

export function AppHeader() {  
  const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 25, marginRight: 25, marginBottom: 25} }>
      <Text>Header</Text>
      <Text>|||</Text>
      </View>
);
};
