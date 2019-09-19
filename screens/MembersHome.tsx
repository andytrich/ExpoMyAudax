import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AudaxService } from '../services/apiAudax';
import { NavigationInjectedProps } from 'react-navigation';
import { Button, Container, Content } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import FooterComponent from './Footer';
import HeaderComponent from './Header';

export interface MembersHomeProps {
}

export interface MembersHomeState {
    loggedIn: boolean
}

export default class MembersHomeComponent extends React.Component<NavigationInjectedProps<{}> & MembersHomeProps, MembersHomeState> {
  constructor(props: NavigationInjectedProps<{}> & MembersHomeProps) {
    super(props);
    this.state = {
        loggedIn: true
    };
  }
  logOut() {
    AudaxService.logoff()
      .then(async (response)=> {
        await SecureStore.deleteItemAsync("AudaxPassword");
        await SecureStore.deleteItemAsync("AudaxUser");
        this.setState({loggedIn : false});
        console.log('Logged off in service ' + response.toString());
        this.props.navigation.navigate('Home')
      })
      .catch((error)=> {
        this.setState({loggedIn : false});
        console.log(error);
      });
  }
  
  public render() {
    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Text>MembersHome Component</Text>
          <Button onPress={()=>{this.logOut()}}><Text>Sign Out</Text></Button>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
