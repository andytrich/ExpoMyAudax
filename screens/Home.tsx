import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Container, Card, CardItem, Content, Text, View } from 'native-base';
import { Avatar, Icon } from 'react-native-elements';
import FooterComponent from './Footer';
import HeaderComponent from './Header';

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
        <Content style={{marginTop:150}}>
            <Card >
              <CardItem style={{width:'100%', justifyContent:'center'}} cardBody button onPress={()=>{this.props.navigation.navigate('EventRides')}}>
              <Icon name='search' size={100}></Icon>
              <Text>Search for a ride</Text>
              </CardItem>
            </Card>
            <Card >
              <CardItem style={{width:'100%', justifyContent:'center'}} cardBody button onPress={()=>{this.props.navigation.navigate('AuthLoading')}}>
              <Icon name='bicycle' type='font-awesome' size={100} />
              <Text>Members</Text>
              </CardItem>
            </Card>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
    }
}
