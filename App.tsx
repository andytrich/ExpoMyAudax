import React from 'react';
import { NavigationInjectedProps } from "react-navigation";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Main } from './navigators/mainStack';

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



