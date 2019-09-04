import React from 'react';
import LoginComponent from './screens/Login';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import MyRidesComponent from './screens/MyRides';
import HomeComponent from './screens/Home';
import AuthLoadingComponent from './screens/AuthLoading';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MyDetailsComponent from './screens/MyDetails';

const AuthStack = createStackNavigator({ Login: LoginComponent });
//const AppStack = createStackNavigator({ Home: HomeComponent, MyRides: MyRidesComponent });
const AppStack = createMaterialBottomTabNavigator({ Home: HomeComponent, MyRides: MyRidesComponent, MyDetails: MyDetailsComponent });

const Main =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingComponent,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default function App() {
  return (
      <Main></Main>
  );
}



