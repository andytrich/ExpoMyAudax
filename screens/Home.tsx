import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Col, Grid } from 'react-native-easy-grid';
import { Container, Card, CardItem, Content, Text } from 'native-base';
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
        <Content>
          <Grid>
            <Col>
            <Card>
              <CardItem cardBody button onPress={()=>{this.props.navigation.navigate('EventRides')}}>
                <Text>Search for a ride</Text>
              </CardItem>
            </Card>
            </Col>
            <Col>
            <Card>
              <CardItem cardBody button onPress={()=>{this.props.navigation.navigate('AuthLoading')}}>
                <Text>Members</Text>
              </CardItem>
            </Card>
            </Col>
          </Grid>
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
    }
}
