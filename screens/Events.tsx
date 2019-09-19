import * as React from 'react';
import { Container, Content, Text } from 'native-base';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { NavigationInjectedProps } from 'react-navigation';

export interface EventsProps {
}

export interface EventsState {
}

export default class EventsComponent extends React.Component<NavigationInjectedProps<{}> & EventsProps, EventsState> {
  constructor(props: NavigationInjectedProps<{}> & EventsProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Text>Events</Text>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
