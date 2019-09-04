import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Login } from '../models/login';
import { AudaxService } from '../services/apiAudax';
import Axios from 'axios';

export interface RiderDetailsProps {
}

export interface RiderDetailsState {
    loggedIn : boolean
}

export default class RiderDetailsComponent extends React.Component<RiderDetailsProps, RiderDetailsState> {
  constructor(props: RiderDetailsProps) {
    super(props);
    this.state = {
        loggedIn : false
    };
  }
  
  getLoginState() {    
    this.setState({loggedIn : AudaxService.isRiderLoggedIn()});    
  }

  getMember() {
    Axios.get('https://www.aukweb.net/members/results')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  public render() {
    return (
      <View>
                   <Button onPress={this.getMember} title="Member"></Button>
                   <Button testID='LoginButton' onPress={()=>{this.getLoginState()}} title="Get Login State"></Button>
<Text>The state is : {this.state.loggedIn.toString()} *</Text>       
      </View>
    );
  }
}
