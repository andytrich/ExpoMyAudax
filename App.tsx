import React from 'react';
import {View} from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { SearchForEvents } from './screens/SearchForEvents';


export interface AppProps {
}

export interface AppState {
  isReady : boolean
}

export default function App() {
  return (
    <View style={{flex: 1, flexDirection: 'column', paddingTop: 40} }>
      <SearchForEvents />
    </View>
  );
  /*    const [fontsLoaded, fontError] = useFonts({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf')
    });
  
    
    if (!fontsLoaded) {
    console.log('Font not loaded')
    if (fontError) {
      console.log(fontError!.message);
    }
      return <AppLoading />
    } else {
      return (
        <SearchForEvents />
      ); */
}



