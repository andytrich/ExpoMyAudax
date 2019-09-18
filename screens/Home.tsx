import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Card, CardItem, Icon } from 'native-base';
import {Image} from 'react-native-elements';
import { ActivityIndicator } from 'react-native';

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
        <Grid>
            <Col>
              <Card>                
                <CardItem cardBody button onPress={()=>{this.props.navigation.navigate('EventRides')}}>
                <Image
                  source={{ uri: 'https://www.audax.uk/images/audax-logo.png' }}
                  style={{ width: 200, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                />           
                </CardItem>
              </Card>
            </Col>
            <Col>
              <Card>                
              <CardItem cardBody button onPress={()=>{this.props.navigation.navigate('AuthLoading')}}>
                <Image
                  source={{ uri: 'https://www.audax.uk/images/audax-logo.png' }}
                  style={{ width: 200, height: 200 }}
                  PlaceholderContent={<ActivityIndicator />}
                />        
                </CardItem>
              </Card>
            </Col>
        </Grid>

    );
    }
}
