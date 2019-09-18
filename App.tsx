import React from 'react';
import LoginComponent from './screens/Login';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import MyRidesComponent from './screens/MyRides';
import HomeComponent from './screens/Home';
import AuthLoadingComponent from './screens/AuthLoading';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import MyDetailsComponent from './screens/MyDetails';
import { AppLoading } from 'expo';
import { Container, Text, Header, Left, Button, Icon, Body, Title, Right, Footer, FooterTab } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import EventsComponent from './screens/events';

const AuthStack = createStackNavigator({ Login: LoginComponent });
//const AppStack = createStackNavigator({ Home: HomeComponent, MyRides: MyRidesComponent });
const AppStack = createStackNavigator({ Home: HomeComponent, MyRides: MyRidesComponent, MyDetails: MyDetailsComponent, EventRides : EventsComponent });

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

export default class App extends React.Component<AppProps, AppState> {
  constructor(props) {
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
      <Container style={{marginTop:25}}>
        <Header>
        <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Audax UK</Title>
          </Body>
          <Right />
        </Header>
        <Main></Main>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}



