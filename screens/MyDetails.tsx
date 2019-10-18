import * as React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { AudaxService } from '../services/AudaxService';
import { NavigationInjectedProps } from 'react-navigation';
import * as SecureStore from 'expo-secure-store';
import { Container, Footer, Content } from 'native-base';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

export interface MyDetailsProps {
}

export interface MyDetailsState {
}

export default class MyDetailsComponent extends React.Component<NavigationInjectedProps<{}> &  MyDetailsProps, MyDetailsState> {
  constructor(props: NavigationInjectedProps<{}> &  MyDetailsProps) {
    super(props);
    this.state = {
    };
  }

 
  public render() {
    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <FooterComponent navigation={this.props.navigation}></FooterComponent>
        </Content>
      </Container>
    );
  }
}
