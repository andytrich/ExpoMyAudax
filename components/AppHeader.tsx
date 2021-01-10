import React from 'react';
import {Image, Text, View} from 'react-native'

export function AppHeader() {  
  const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
  return (
    <View style={{marginLeft: 25, marginRight: 25, marginBottom: 25}}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom:15 }}>
      <Image style={{ height: 50, width: 100 }} source={require('../assets/audax-logo.png')} />
      <Image style={{height:50, width:120}} source={require('../assets/DropDown.png')} />
      <Image style={{ height: 50, width: 70 }} source={require('../assets/Menu.png')} />

      </View>        
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ height: 1, width:'100%', alignSelf:'stretch'}} source={require('../assets/Divider.png')} />
        </View>
      </View>
  );
};
