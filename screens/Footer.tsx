import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { FooterTab, Button, Icon, Footer } from 'native-base';

export interface FooterProps {
}

export interface FooterState {
}

export default class FooterComponent extends React.Component<NavigationInjectedProps<{}> & FooterProps, FooterState> {
  constructor(props: NavigationInjectedProps<{}> & FooterProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Footer>
{/*         <FooterTab>
          <Button>
            <Icon name='home' onPress={() => { this.props.navigation.navigate('Home') }} />
          </Button>
          <Button>
            <Icon name='search' onPress={() => { this.props.navigation.navigate('EventRides') }} />
          </Button>
          <Button>
            <Icon name='bike' type='MaterialCommunityIcons' onPress={() => { this.props.navigation.navigate('AuthLoading') }} />
          </Button>
        </FooterTab> */}
      </Footer>
    );
  }
}
