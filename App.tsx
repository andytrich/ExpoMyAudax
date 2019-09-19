import React from 'react';
import LoginComponent from './screens/Login';
import { createAppContainer, createSwitchNavigator, NavigationInjectedProps } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import MyRidesComponent from './screens/MyRides';
import HomeComponent from './screens/Home';
import AuthLoadingComponent from './screens/AuthLoading';
import MyDetailsComponent from './screens/MyDetails';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import EventsComponent from './screens/Events';
import MembersHomeComponent from './screens/MembersHome';



const AuthStack = createStackNavigator({ Login: LoginComponent },{headerMode:'none'});
const AppStack = createStackNavigator({ Home: HomeComponent, MyRides: MyRidesComponent, MyDetails: MyDetailsComponent, EventRides : EventsComponent, MembersHome : MembersHomeComponent },{headerMode:'none'});


const Main =  createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingComponent,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    }
  )
);


export interface AppProps {
}

export interface AppState {
  isReady : boolean
}

export default class App extends React.Component<NavigationInjectedProps<{}> & AppProps, AppState> {
  constructor(props: NavigationInjectedProps<{}> & AppProps) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
        <Main></Main>
    );
  }
}



