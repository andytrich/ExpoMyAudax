import { createStackNavigator } from 'react-navigation-stack';
import HomeComponent from '../screens/Home';
import MyRidesComponent from '../screens/MyRides';
import MyDetailsComponent from '../screens/MyDetails';
import EventsComponent from '../screens/Events';
import MembersHomeComponent from '../screens/MembersHome';

export const AppStack = createStackNavigator({ Home: HomeComponent, 
  MyRides: MyRidesComponent, 
  MyDetails: MyDetailsComponent, 
  EventRides: EventsComponent, 
  MembersHome: MembersHomeComponent }, 
  { headerMode: 'none' });
