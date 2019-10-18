import * as React from 'react';
import { Header, Left, Button, Body, Title, Right, Icon } from 'native-base';

export interface HeaderProps {
}

export interface HeaderState {
}

export default class HeaderComponent extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
    };
  }

  public render() {
    return (
        <Header>
        <Left>
{/*             <Button transparent>
              <Icon name='menu' />
            </Button> */}
          </Left>
          <Body>
            <Title>Audax UK</Title>
          </Body>
          <Right />
        </Header>
    );
  }
}
