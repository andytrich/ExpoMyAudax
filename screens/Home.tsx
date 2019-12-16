import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Container, Card, CardItem, Content, Text, View } from 'native-base';
import {  Image } from 'react-native-elements';
import FooterComponent from './Footer';
import HeaderComponent from './Header';
import { ActivityIndicator } from 'react-native';
import { EventRidesImage, MembersImage } from '../images/homeImages'

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
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
            <Card >
              <CardItem style={{width:'100%', justifyContent:'center'}} cardBody button onPress={()=>{this.props.navigation.navigate('EventRides')}}>
              <Image style={{width:170, height:210}} source={{uri: EventRidesImage}} PlaceholderContent={<ActivityIndicator />}/>
              </CardItem>
            </Card>
            <Card >
              <CardItem style={{width:'100%', justifyContent:'center'}} cardBody button onPress={()=>{this.props.navigation.navigate('AuthLoading')}}>
                <Image style={{width:170, height:210}} source={{uri: MembersImage}} PlaceholderContent={<ActivityIndicator />} />
              </CardItem>
            </Card>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
    }

    
}
