import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MembersHomeComponent from '../screens/MembersHome';

export default createMaterialBottomTabNavigator(
  {
    MembersHome: { screen :MembersHomeComponent  }
  },
  {
    initialRouteName: 'MembersHome',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
  }
);