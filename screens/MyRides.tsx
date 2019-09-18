import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AudaxService } from '../services/apiAudax';
import { enteredRides } from '../models/enteredRides';
import { ListItem } from 'react-native-elements';

export interface MyRidesProps {
}

export interface MyRidesState {
  myRides : enteredRides[]
}

export default class MyRidesComponent extends React.Component<MyRidesProps, MyRidesState> {
  constructor(props: MyRidesProps) {
    super(props);
    this.state = {myRides : new Array<enteredRides>()}
    this.getMyRides();
  }

  async getMyRides(){
    let rides = await AudaxService.myRides();
    this.setState({myRides: rides})
  }  

  public render() {
    return (
      <View>
         <Text>My Rides</Text>
         {
          this.state.myRides.map((l, i) => (
            <ListItem
              key={i}
              title={l.title}
              subtitle={l.rideType}
            />
          ))
          }
      </View>
    );
  }
}
