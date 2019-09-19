import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { AudaxService } from '../services/apiAudax';
import { enteredRides } from '../models/enteredRides';
import { ListItem, Container, Content } from 'native-base';
import FooterComponent from './Footer';
import HeaderComponent from './Header';
import { NavigationInjectedProps } from 'react-navigation';

export interface MyRidesProps {
}

export interface MyRidesState {
  myRides : enteredRides[]
}

export default class MyRidesComponent extends React.Component<NavigationInjectedProps<{}> &  MyRidesProps, MyRidesState> {
  constructor(props: NavigationInjectedProps<{}> &  MyRidesProps) {
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
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Text>My Rides</Text>
          {/* {
          this.state.myRides.map((l, i) => (
          <ListItem key={i} title={l.title} subtitle={l.rideType} />
          ))
          } */}
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
