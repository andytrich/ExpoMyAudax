import * as React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import { AudaxService } from '../services/apiAudax';

export interface MyDetailsProps {
}

export interface MyDetailsState {
}

export default class MyDetailsComponent extends React.Component<MyDetailsProps, MyDetailsState> {
  constructor(props: MyDetailsProps) {
    super(props);
    this.state = {
    };
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
      <View>
         <Button onPress={()=>{this.logOut()}} title="Logout"></Button>
      </View>
    );
  }
}
