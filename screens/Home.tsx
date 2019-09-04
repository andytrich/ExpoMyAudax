import * as React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

export interface HomeProps {
}

export interface HomeState {
}

export default class HomeComponent extends React.Component<NavigationInjectedProps<{}> & HomeProps, HomeState> {
  constructor(props: NavigationInjectedProps<{}> & HomeProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <View style={{paddingTop:50}}>
         <Text>Audax Home</Text>         
          <Button onPress={()=>{this.props.navigation.push('MyRides')}} title="MyRides"></Button>     
      </View>
    );
  }
}
