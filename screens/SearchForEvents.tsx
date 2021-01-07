import * as React from 'react';
import { View, Text } from 'react-native';
import { AppHeader } from '../components/AppHeader';

interface ISearchForEventsProps {
}

export const SearchForEvents: React.FC<ISearchForEventsProps> = (props) => {
  return (
    <View>  
      <AppHeader></AppHeader>
      <View>
          <Text>Search for events</Text>
      </View>
    </View>
  );
};