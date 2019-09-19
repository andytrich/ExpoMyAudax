import * as React from 'react';
import { Container, Content, Text, Button } from 'native-base';
import HeaderComponent from './Header';
import FooterComponent from './Footer';
import { NavigationInjectedProps } from 'react-navigation';
import { AudaxService } from '../services/apiAudax';
import { CalendarEvent, CalendarEvents } from '../models/calendarEvents';
import { ListItem } from 'react-native-elements';


export interface EventsProps {
}

export interface EventsState {
  events : CalendarEvent[]
}

export default class EventsComponent extends React.Component<NavigationInjectedProps<{}> & EventsProps, EventsState> {
  constructor(props: NavigationInjectedProps<{}> & EventsProps) {
    super(props);
    this.state = {
      events : new Array<CalendarEvent>()
    };
  }

  async getEvents(){
    let eventsList = await AudaxService.allEvents();
    console.log(eventsList);
    this.setState({events: eventsList.Items})
  } 

  public render() {
    return (
      <Container style={{marginTop:25}}>
        <HeaderComponent></HeaderComponent>
        <Content>
          <Text>Events</Text>
          <Button style={{width:80, borderRadius:10, justifyContent: 'center'}}  onPress={()=>{this.getEvents();}} ><Text style={{color:'white', fontWeight:'bold', fontSize:18}}>Get All Events</Text></Button>
{
  this.state.events.map((l, i) => (
  <ListItem key={i} title={l.Title} subtitle={l.Body} />
  ))
  } 
        </Content>
        <FooterComponent navigation={this.props.navigation}></FooterComponent>
      </Container>
    );
  }
}
