import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AudaxService } from '../services/apiAudax';
import { NavigationInjectedProps } from 'react-navigation';
import { Button, Container, Content, Card, CardItem } from 'native-base';
import * as SecureStore from 'expo-secure-store';
import FooterComponent from './Footer';
import HeaderComponent from './Header';
import { Icon } from 'react-native-elements';

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
           <Content style={{marginTop:100}}>
            <Card >
              <CardItem style={{width:'100%', justifyContent:'center', }} cardBody button onPress={()=>{this.props.navigation.navigate('MyRides')}}>
              <Icon name='calendar' type='font-awesome' size={100}></Icon>
              <Text>Rides I've entered</Text>
              </CardItem>
            </Card>
            <Card >
              <CardItem style={{width:'100%', justifyContent:'center'}} cardBody button onPress={()=>{this.props.navigation.navigate('AuthLoading')}}>
              <Icon name='book' type='font-awesome' size={100} />
              <Text>History</Text>
              </CardItem>
            </Card>
            <Button style={{marginTop:25, width:80, borderRadius:10, alignSelf:'center'}} onPress={()=>{this.logOut()}}><Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Sign Out</Text></Button>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
