import * as React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { AudaxService } from '../services/apiAudax';
import { NavigationInjectedProps } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';

export interface MyDetailsProps {
}

export interface MyDetailsState {
}

export default class MyDetailsComponent extends React.Component<NavigationInjectedProps<{}> &  MyDetailsProps, MyDetailsState> {
  constructor(props: NavigationInjectedProps<{}> &  MyDetailsProps) {
    super(props);
    this.state = {
    };
  }

  logOut() {
    AudaxService.logoff()
      .then((response)=> {
        SecureStore.deleteItemAsync("AudaxPassword");
        SecureStore.deleteItemAsync("AudaxUser");
        this.setState({loggedIn : false});
        console.log('Logged off in service ' + response.toString());
        this.props.navigation.push('Auth');
      })
      .catch((error)=> {
        this.setState({loggedIn : false});
        console.log(error);
      });
  }
  
  public render() {
    return (
      <View>
         <Button onPress={()=>{this.logOut()}} title="Logout"></Button>
      </View>
    );
  }
}
