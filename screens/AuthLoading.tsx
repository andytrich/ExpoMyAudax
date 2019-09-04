import * as React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { NavigationInjectedProps } from 'react-navigation';
import { Login } from '../models/login';

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
/*         const credentials = await Keychain.getGenericPassword();
        if (credentials){
          let riderLoginDetail = new Login();
          riderLoginDetail.membershipNumber = credentials.username;
          riderLoginDetail.password = credentials.password;
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          this.props.navigation.navigate(riderLoginDetail ? 'App' : 'Auth');
        } */
        let riderLoginDetail = new Login();
        riderLoginDetail.password = await AsyncStorage.getItem("AudaxPassword");
        riderLoginDetail.membershipNumber = await AsyncStorage.getItem("AudaxUser");
        //this.props.navigation.navigate('Auth');
        this.props.navigation.navigate(riderLoginDetail.password ? 'App' : 'Auth');
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
