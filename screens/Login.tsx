import * as React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import {Button} from 'react-native-elements';
import { Login } from '../models/login';
import { AudaxService } from '../services/apiAudax';
import { NavigationInjectedProps } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';

export interface LoginProps {
}

export interface LoginState {
  loggedIn : boolean
}

export default class LoginComponent extends React.Component<NavigationInjectedProps<{}> & LoginProps, LoginState> {

    

    constructor(props: NavigationInjectedProps<{}> & LoginProps) {     
    super(props);
    this.state = {
      loggedIn : false
    };
  }

   login() {
    let customerDetails = new Login();
    customerDetails.login = 'Login';
    customerDetails.membershipNumber = '17370';
    customerDetails.password = 'xr9hng';
    AudaxService.login(customerDetails).then((data)=>{ 
      this.setState({loggedIn : data});
      //Keychain.setGenericPassword(customerDetails.membershipNumber, customerDetails.password).then((result)=>{console.log('saved credentials')});
      SecureStore.setItemAsync("AudaxPassword", customerDetails.password);
      SecureStore.setItemAsync("AudaxUser", customerDetails.membershipNumber);
      this.props.navigation.push('Home')
    });
  }

  getMember() {
    AudaxService.myRides().then((rides)=>{
        console.log(rides);
      })
}

  logOut() {
    AudaxService.logoff()
      .then((response)=> {
        AsyncStorage.removeItem("AudaxPassword");
        AsyncStorage.removeItem("AudaxUser");
        this.setState({loggedIn : false});
        console.log('Logged off in service ' + response.toString());
      })
      .catch((error)=> {
        this.setState({loggedIn : false});
        console.log(error);
      });
  }

  public render() {
    return (
      <View style={{paddingTop:50}}>
         <Text>Login Component</Text>
         <Button testID='LoginButton' onPress={()=>{this.login()}} title="Login"></Button>
         <Button onPress={()=>{this.getMember()}} title="Member"></Button>
         <Button onPress={()=>{this.logOut()}} title="Logout"></Button>
         <Button onPress={()=>{this.props.navigation.push('Details')}} title="Details"></Button>
         <Button onPress={()=>{this.props.navigation.push('MyRides')}} title="MyRides"></Button>   
         <Text>The state is : {this.state.loggedIn.toString()} *</Text>        
      </View>
    );
  }
}