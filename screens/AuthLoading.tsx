import * as React from 'react';
import { View, ActivityIndicator, StatusBar} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { NavigationInjectedProps } from 'react-navigation';
import { Login } from '../models/login';
import { AudaxService } from '../services/apiAudax';

export interface AuthLoadingProps {
}

export interface AuthLoadingState {
}

export default class AuthLoadingComponent extends React.Component<NavigationInjectedProps<{}> & AuthLoadingProps, AuthLoadingState> {
  constructor(props: NavigationInjectedProps<{}> & AuthLoadingProps) {
    super(props);
    this.state = {
    };
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
      try {
        let riderLoginDetail = new Login();
        riderLoginDetail.password = await SecureStore.getItemAsync("AudaxPassword");
        riderLoginDetail.membershipNumber = +(await SecureStore.getItemAsync("AudaxUser"));
        let loggedIn = await AudaxService.login(riderLoginDetail);
        this.props.navigation.navigate(loggedIn ? 'App' : 'Auth');
      } catch (error) {
        this.props.navigation.navigate('Auth');
      }
  };

  public render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
