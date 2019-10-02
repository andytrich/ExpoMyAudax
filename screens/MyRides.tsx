import * as React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { AudaxService } from '../services/apiAudax';
import { enteredRides } from '../models/enteredRides';
import { Container, Content } from 'native-base';
import FooterComponent from './Footer';
import HeaderComponent from './Header';
import { NavigationInjectedProps } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import Moment from 'moment';
import TouchableScale from 'react-native-touchable-scale';

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
  
  gradientCalculator(distance: number) : Array<string>{
    let result = new Array<string>();

    switch (Math.round(distance / 50)*50) {
      case 50:
         result = ['#ffffff', '#ff99cc']
        break;
        case 100:
            result = ['#ffffff', '#99ccff']
           break;
        case 150:
              result = ['#ffffff', '#cc99cc']
            break; 
        case 200:
            result = ['#ffffff', '#d83c3d']
          break; 
        case 300:
            result = ['#ffffff', '#ffcc00']
          break;   
        case 400:
            result = ['#ffffff', '#339933']
          break;        
        case 600:
            result = ['#ffffff', '#006699']
          break;        
      default:
          result = ['#ffffff', '#999999'];
        break;
    }
    
    return result;
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
        {
          this.state.myRides.map((l, i) => (
          <ListItem key={i} rightTitle={l.rideType} title={l.title} subtitle={Moment(l.eventDate).format("Do MMMM YYYY")}
            style={{margin:5, borderRadius:10}} Component={TouchableScale} tension={100} activeScale={0.95}
            linearGradientProps={{
              colors: this.gradientCalculator(l.distance),
              start: [1, 0],
              end: [0.2, 0],
            }} onPress={ ()=>{ Linking.openURL('http://www.aukweb.net/events/detail/19-'+l.id.toString())}}/>
            ))
            }
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
